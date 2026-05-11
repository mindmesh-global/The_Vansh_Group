import { Resend } from "resend";
import { NextResponse } from "next/server";

const MAX_MESSAGE = 8000;

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL ?? "Admin@thevanshgroup.com";

  if (!apiKey) {
    return NextResponse.json(
      { error: "Server is not configured for email." },
      { status: 503 },
    );
  }
  if (!from) {
    return NextResponse.json(
      { error: "Missing RESEND_FROM_EMAIL." },
      { status: 503 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { firstName, lastName, email, message } = payload as Record<
    string,
    unknown
  >;

  const msg =
    typeof message === "string" ? message.trim().slice(0, MAX_MESSAGE) : "";
  if (!msg) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  const fn = typeof firstName === "string" ? firstName.trim().slice(0, 120) : "";
  const ln = typeof lastName === "string" ? lastName.trim().slice(0, 120) : "";
  const em = typeof email === "string" ? email.trim().slice(0, 254) : "";
  const name = [fn, ln].filter(Boolean).join(" ") || "Website visitor";

  const resend = new Resend(apiKey);
  const text = `Name: ${name}\nEmail: ${em || "(not provided)"}\n\nMessage:\n${msg}`;
  const html = `<p><strong>Name:</strong> ${escapeHtml(name)}</p>
<p><strong>Email:</strong> ${escapeHtml(em || "(not provided)")}</p>
<p><strong>Message:</strong></p>
<pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(msg)}</pre>`;

  const { data, error } = await resend.emails.send({
    from,
    to,
    ...(em ? { replyTo: em } : {}),
    subject: `Website contact — ${name}`,
    text,
    html,
  });

  if (error) {
    return NextResponse.json(
      { error: error.message ?? "Failed to send email." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true as const, id: data?.id });
}

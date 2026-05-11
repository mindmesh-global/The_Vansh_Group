/**
 * 1) Knocks out near-white background → transparent (keeps saturated sun + rays).
 * 2) Trims empty edges, writes public/vansh-logo-mark.png for the site.
 * 3) Writes src/app/icon.png + apple-icon.png (alpha-safe, no ImageResponse).
 *
 * Source: public/vansh-logo-mark.png (replace that file with a new export when design changes).
 */
import sharp from "sharp";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const markPath = join(root, "public", "vansh-logo-mark.png");
const appDir = join(root, "src", "app");

const ZOOM = 1.72;

/**
 * @param {Buffer} data
 * @param {{ width: number; height: number; channels: number }} info
 */
function knockOutWhiteBackground(data, info) {
  const { width, height, channels } = info;
  if (channels < 3) return;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const lightness = (r + g + b) / 3;
      const sat = max === 0 ? 0 : (max - min) / max;

      // Background: very light + almost gray (white / off-white), not the colorful sun.
      if (lightness > 248 && sat < 0.06) {
        data[i + 3] = 0;
      } else if (lightness > 242 && sat < 0.035) {
        const t = (lightness - 242) / 6;
        data[i + 3] = Math.round(data[i + 3] * (1 - Math.min(1, t)));
      }
    }
  }
}

async function processMarkPng() {
  const { data, info } = await sharp(markPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  knockOutWhiteBackground(data, info);

  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: info.channels,
    },
  })
    .ensureAlpha()
    .trim()
    .png({ compressionLevel: 9 })
    .toFile(markPath);
}

async function makeAppIcon(size, filename) {
  const meta = await sharp(markPath).metadata();
  const w = meta.width ?? size;
  const h = meta.height ?? size;
  const zw = Math.max(1, Math.round(w * ZOOM));
  const zh = Math.max(1, Math.round(h * ZOOM));

  await sharp(markPath)
    .ensureAlpha()
    .resize(zw, zh)
    .resize(size, size, { fit: "cover", position: "centre" })
    .png({ compressionLevel: 9 })
    .toFile(join(appDir, filename));
}

await processMarkPng();
await makeAppIcon(512, "icon.png");
await makeAppIcon(180, "apple-icon.png");
console.log("Updated public/vansh-logo-mark.png and wrote src/app/icon.png, apple-icon.png");

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const LOGO = path.join(__dirname, "..", "public", "logo.png");
const ICONS_DIR = path.join(__dirname, "..", "public", "icons");
const SPLASH_DIR = path.join(__dirname, "..", "public", "splash");
const BRAND_COLOR = "#2B6777";

fs.mkdirSync(ICONS_DIR, { recursive: true });
fs.mkdirSync(SPLASH_DIR, { recursive: true });

async function generate() {
  // Standard icons
  await sharp(LOGO)
    .resize(192, 192)
    .png()
    .toFile(path.join(ICONS_DIR, "icon-192x192.png"));

  await sharp(LOGO)
    .resize(512, 512)
    .png()
    .toFile(path.join(ICONS_DIR, "icon-512x512.png"));

  // Maskable icon — logo centered with 20% padding on brand-color background
  const maskableSize = 512;
  const padding = Math.round(maskableSize * 0.2);
  const logoSize = maskableSize - padding * 2;

  const logoBuf = await sharp(LOGO).resize(logoSize, logoSize).png().toBuffer();

  await sharp({
    create: {
      width: maskableSize,
      height: maskableSize,
      channels: 4,
      background: BRAND_COLOR,
    },
  })
    .composite([{ input: logoBuf, left: padding, top: padding }])
    .png()
    .toFile(path.join(ICONS_DIR, "icon-maskable-512x512.png"));

  // Apple touch icon
  await sharp(LOGO)
    .resize(180, 180)
    .png()
    .toFile(path.join(ICONS_DIR, "apple-touch-icon-180x180.png"));

  // iOS splash screens — centered logo on white background
  const splashSizes = [
    { w: 1170, h: 2532, name: "apple-splash-1170x2532.png" }, // iPhone 12/13/14
    { w: 1179, h: 2556, name: "apple-splash-1179x2556.png" }, // iPhone 14 Pro
    { w: 1290, h: 2796, name: "apple-splash-1290x2796.png" }, // iPhone 14 Pro Max
    { w: 2048, h: 2732, name: "apple-splash-2048x2732.png" }, // iPad Pro 12.9"
  ];

  for (const { w, h, name } of splashSizes) {
    const splashLogoSize = Math.round(Math.min(w, h) * 0.25);
    const splashLogoBuf = await sharp(LOGO)
      .resize(splashLogoSize, splashLogoSize)
      .png()
      .toBuffer();

    await sharp({
      create: { width: w, height: h, channels: 4, background: "#ffffff" },
    })
      .composite([
        {
          input: splashLogoBuf,
          left: Math.round((w - splashLogoSize) / 2),
          top: Math.round((h - splashLogoSize) / 2),
        },
      ])
      .png()
      .toFile(path.join(SPLASH_DIR, name));
  }

  console.log("Icons and splash screens generated successfully.");
}

generate().catch((err) => {
  console.error("Failed to generate icons:", err);
  process.exit(1);
});

const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const sourceFile = path.join(__dirname, "../public/token.png");
const publicDir = path.join(__dirname, "../public");

async function generateAssets() {
  try {
    if (!fs.existsSync(sourceFile)) {
      console.error("Source file token.png not found in public/ directory.");
      process.exit(1);
    }

    console.log("Generating favicon-16x16.png...");
    await sharp(sourceFile)
      .resize(16, 16)
      .toFile(path.join(publicDir, "favicon-16x16.png"));

    console.log("Generating favicon-32x32.png...");
    await sharp(sourceFile)
      .resize(32, 32)
      .toFile(path.join(publicDir, "favicon-32x32.png"));

    console.log("Generating favicon.ico...");
    await sharp(sourceFile)
      .resize(32, 32)
      .toFile(path.join(publicDir, "favicon.ico"));

    console.log("Generating apple-touch-icon.png...");
    await sharp(sourceFile)
      .resize(180, 180)
      .toFile(path.join(publicDir, "apple-touch-icon.png"));

    console.log("Generating android-chrome-192x192.png...");
    await sharp(sourceFile)
      .resize(192, 192)
      .toFile(path.join(publicDir, "android-chrome-192x192.png"));

    console.log("Generating android-chrome-512x512.png...");
    await sharp(sourceFile)
      .resize(512, 512)
      .toFile(path.join(publicDir, "android-chrome-512x512.png"));

    console.log("Generating og.png...");
    // Create a 1200x630 purple canvas and composite token.png in the center
    const logoResized = await sharp(sourceFile).resize(300, 300).toBuffer();
    await sharp({
      create: {
        width: 1200,
        height: 630,
        channels: 4,
        background: { r: 124, g: 58, b: 237, alpha: 1 } // #7C3AED
      }
    })
      .composite([{ input: logoResized, gravity: "center" }])
      .toFile(path.join(publicDir, "og.png"));

    console.log("All image assets generated successfully!");
  } catch (err) {
    console.error("Error generating assets:", err);
  }
}

generateAssets();

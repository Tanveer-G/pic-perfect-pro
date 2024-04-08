import sharp from "sharp";
import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Parse the URL and query parameters
  const url = new URL(req.url);
  const flipDirection = url.searchParams.get("value"); // Get the flip direction

  // Define the path to the image
  const imagePath = path.join(process.cwd(), "public", "resizer-image.avif");

  // Check if the image exists and is accessible
  if (!fs.existsSync(imagePath)) {
    return new NextResponse("Image not found.", { status: 404 });
  }

  try {
    // Read the image file
    const imageBuffer = fs.readFileSync(imagePath);

    // Apply image flip/flop based on the flipDirection parameter
    let processedImage = sharp(imageBuffer);
    if (flipDirection === "horizontal") {
      processedImage = processedImage.flop(true);
    } else if (flipDirection === "vertical") {
      processedImage = processedImage.flip(true);
    }

    // Create and return the response with the flipped image
    const flippedImage = await processedImage.toBuffer();
    const response = new NextResponse(flippedImage);
    response.headers.set("Content-Type", "image/jpeg");
    return response;
  } catch (error) {
    // Handle any errors during image processing
    console.error("Error flipping image:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

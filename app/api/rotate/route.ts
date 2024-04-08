import sharp from "sharp";
import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Parse the URL and query parameters
  const url = new URL(req.url);
  const value = url.searchParams.get("value");

  // Validate the value parameter
  if (!value || isNaN(Number(value))) {
    return new NextResponse("Invalid value parameters.", {
      status: 400,
    });
  }

  const valueNum = parseInt(value);

  // Define the path to the image
  const imagePath = path.join(process.cwd(), "public", "resizer-image.avif");

  // Check if the image exists and is accessible
  if (!fs.existsSync(imagePath)) {
    return new NextResponse("Image not found.", { status: 404 });
  }

  try {
    // Read the image file
    const imageBuffer = fs.readFileSync(imagePath);

    // Rotate the image by the specified value (e.g., 90 degrees)
    const rotatedImage = await sharp(imageBuffer)
      .rotate(valueNum, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toBuffer();

    // Create and return the response with the rotated image
    const response = new NextResponse(rotatedImage);
    response.headers.set("Content-Type", "image/jpeg");
    return response;
  } catch (error) {
    // Handle any errors during image processing
    console.error("Error rotating image:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

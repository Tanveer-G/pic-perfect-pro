import sharp from "sharp";
import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Parse the URL and query parameters
  const url = new URL(req.url);
  const width = url.searchParams.get("width");
  const height = url.searchParams.get("height");
  const top = url.searchParams.get("top");
  const left = url.searchParams.get("left");

  // Validate the width and height parameters
  if (
    !width ||
    !height ||
    !top ||
    !left ||
    isNaN(Number(width)) ||
    isNaN(Number(height)) ||
    isNaN(Number(top)) ||
    isNaN(Number(left))
  ) {
    return new NextResponse("Invalid width or height parameters.", {
      status: 400,
    });
  }

  const widthNum = parseInt(width);
  const heightNum = parseInt(height);
  const topNum = parseInt(top);
  const leftNum = parseInt(left);

  // Define the path to the image
  const imagePath = path.join(process.cwd(), "public", "resizer-image.avif");

  // Check if the image exists and is accessible
  if (!fs.existsSync(imagePath)) {
    return new NextResponse("Image not found.", { status: 404 });
  }

  try {
    // Read the image file
    const imageBuffer = fs.readFileSync(imagePath);

    // crop the image using Sharp
    const optimizedImage = await sharp(imageBuffer)
      .extract({
        left: leftNum,
        top: topNum,
        width: widthNum,
        height: heightNum,
      })
      .toFormat("jpeg")
      .toBuffer();

    // Create and return the response with the optimized image
    const response = new NextResponse(optimizedImage);
    response.headers.set("Content-Type", "image/jpeg");
    return response;
  } catch (error) {
    // Handle any errors during image processing
    console.error("Error processing image:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

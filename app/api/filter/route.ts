import sharp from "sharp";
import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Parse the URL and query parameters
  const { searchParams } = new URL(req.url);
  const filterType = searchParams.get("filtertype"); // Get the filter type
  // Get the filter value

  // Validate the filter type and value
  const validFilterTypes = ["value", "hue", "ligh", "saturation"];
  const isValidFilter = validFilterTypes.some(
    (param) => !isNaN(Number(searchParams.get(param)))
  );

  if (!filterType || !isValidFilter) {
    return new NextResponse("Invalid filter parameters.", {
      status: 400,
    });
  }

  // Define the path to the image (replace with your actual image path)
  const imagePath = path.join(process.cwd(), "public", "resizer-image.avif");

  // Check if the image exists and is accessible
  if (!fs.existsSync(imagePath)) {
    return new NextResponse("Image not found.", { status: 404 });
  }

  try {
    // Read the image file
    const imageBuffer = fs.readFileSync(imagePath);

    // Apply the specified filter based on the filter type
    let processedImage = sharp(imageBuffer);
    switch (filterType) {
      case "grayscale":
        processedImage = processedImage.grayscale(true);
        break;
      case "contrast":
        processedImage = processedImage.modulate({
          brightness: Number(searchParams.get("value")),
        });
        break;
      case "opacity":
        processedImage = processedImage.gamma(
          Number(searchParams.get("value"))
        );
        break;
      case "hue-saturation-light":
        processedImage = processedImage.modulate({
          hue: Number(searchParams.get("hue")),
          lightness: Number(searchParams.get("light")),
          brightness: Number(searchParams.get("saturation")),
        });
        break;
      default:
        return new NextResponse("Invalid filter type.", { status: 400 });
    }

    // Create and return the response with the filtered image
    const filteredImage = await processedImage.toBuffer();
    const response = new NextResponse(filteredImage);
    response.headers.set("Content-Type", "image/jpeg"); // Adjust content type if needed
    return response;
  } catch (error) {
    // Handle any errors during image processing
    console.error("Error applying filter:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

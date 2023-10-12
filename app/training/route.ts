import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { imageZipUrl } = await request.json();

  let response = await fetch(
    "https://api.replicate.com/v1/models/stability-ai/sdxl/versions/c221b2b8ef527988fb59bf24a8b97c4561f1c671f73bd389f866bfb27c061316/trainings",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + process.env.REPLICATE_API_KEY, //change it so the user can user their
      },
      body: JSON.stringify({
        destination: "angela-goncalves/sdxl-different-decade",
        input: {
          input_images: `${imageZipUrl}`,
          train_batch_size: 1,
          caption_prefix: "In the style of TOK, style on 80s decade",
        },
      }),
    }
  );
  // if (response.status === "succeeded") {
  // restoredImage = jsonFinalResponse.output;
  // } else if (response.status === "failed") {
  //   break;
  // } else {
  //   await new Promise((resolve) => setTimeout(resolve, 1000));
  // }

  console.log("response", response);
  return NextResponse.json(response);
}

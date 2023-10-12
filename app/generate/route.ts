import { Ratelimit } from "@upstash/ratelimit";
import redis from "../../utils/redis";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

// Create a new ratelimiter, that allows 5 requests per 24 hours
const ratelimit = redis
  ? new Ratelimit({
      redis: redis,
      limiter: Ratelimit.fixedWindow(5, "1440 m"),
      analytics: true,
    })
  : undefined;

export async function POST(request: Request) {
  // Rate Limiter Code
  if (ratelimit) {
    const headersList = headers();
    const ipIdentifier = headersList.get("x-real-ip");

    const result = await ratelimit.limit(ipIdentifier ?? "");

    if (!result.success) {
      return new Response(
        "Too many uploads in 1 day. Please try again in a 24 hours.",
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": result.limit,
            "X-RateLimit-Remaining": result.remaining,
          } as any,
        }
      );
    }
  }

  const { imageUrl, theme } = await request.json();
  const inputObj = imageUrl
    ? {
        image: imageUrl,
        prompt: `${theme.toLowerCase()}, dressed in 80s style, realistic in style of TOK`,
        a_prompt:
          "best quality, extremely detailed, cinematic photo, ultra-detailed, ultra-realistic, award-winning",
        n_prompt:
          "deformed iris, deformed pupils, semi-realistic, cgi, 3d, 2d, render, sketch, cartoon, drawing, anime, mutated, illustration, hands and fingers, deformed, distorted, distorted look, disfigured, poorly drawn, bad anatomy, wrong anatomy, extra fingers, extra limb, missing limb, floating limbs, disconnected limbs, ugly, disgusting, amputation, worst quality, low quality, medium quality, blurry, warm tones, ugly, broken",
      }
    : {
        prompt: `${theme.toLowerCase()}, dressed in 80s style, realistic in style of TOK`,
        a_prompt:
          "best quality, extremely detailed, cinematic photo, ultra-detailed, ultra-realistic, award-winning",
        n_prompt:
          "deformed iris, deformed pupils, semi-realistic, cgi, 3d, 2d, render, sketch, cartoon, drawing, anime, mutated, illustration, hands and fingers, deformed, distorted, distorted look, disfigured, poorly drawn, bad anatomy, wrong anatomy, extra fingers, extra limb, missing limb, floating limbs, disconnected limbs, ugly, disgusting, amputation, worst quality, low quality, medium quality, blurry, warm tones, ugly, broken",
      };

  // POST request to Replicate to start the image restoration generation process
  let startResponse = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + process.env.REPLICATE_API_KEY,
    },
    body: JSON.stringify({
      version:
        "673f610876e20ed4130559d13e63380abd742bd1411f2c76a1fb7f357b6bf61c",
      input: inputObj,
    }),
  });
  let jsonStartResponse = await startResponse.json();

  let endpointUrl = jsonStartResponse.urls.get;
  console.log(endpointUrl);

  // GET request to get the status of the image restoration process & return the result when it's ready
  let restoredImage: string | null = null;

  while (!restoredImage) {
    // Loop in 1s intervals until the alt text is ready
    // console.log("polling for result...");
    let finalResponse = await fetch(endpointUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + process.env.REPLICATE_API_KEY,
      },
    });
    let jsonFinalResponse = await finalResponse.json();

    if (jsonFinalResponse.status === "succeeded") {
      restoredImage = jsonFinalResponse.output;
    } else if (jsonFinalResponse.status === "failed") {
      break;
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  return NextResponse.json(
    restoredImage ? restoredImage : "Failed to restore image"
  );
}

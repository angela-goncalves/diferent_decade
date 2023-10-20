"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import Link from "next/link";

export default function uploadImg() {
  const [error, setError] = useState("");
  const [predictionImage, setPredictionImage] = useState("");
  const [loadingPredictions, setLoadingPredictions] = useState(false);
  const [loadingTraining, setLoadingTraining] = useState(false);
  const [imageZipUrl, setImageZipUrl] = useState("");
  const [prompt, setPrompt] = useState("");
  const [trainingResponse, setTrainingResponse] = useState({});

  async function TrainPhoto() {
    await new Promise((resolve) => setTimeout(resolve, 200));
    setLoadingTraining(true);
    const res = await fetch(`/training`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageZipUrl: imageZipUrl }),
    });

    if (res.status !== 200) {
      setError("something wrong occurred");
    } else {
      setTrainingResponse(res.json);
    }
    setTimeout(() => {
      setLoadingTraining(false);
    }, 2300);
  }

  return (
    <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-4 sm:mb-0 mb-8">
      <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-normal text-slate-100 sm:text-6xl mb-5">
        Train your model in{" "}
        <span className="text-blue-600">diferent-decade.io</span>
      </h1>
      <h2 className="text-xl">
        You need to create your model on{" "}
        <Link
          className="underline underline-offset-4"
          href="https://replicate.com/models">
          Replicate
        </Link>{" "}
        first
      </h2>

      <label> Enter your zip url </label>
      {/* <Input
        type="password"
        className="w-80 text-black"
        value={imageZipUrl}
        onChange={(e) => setImageZipUrl(e.target.value)}
        placeholder="re282638ksnatskadhm927392lsmahd"
      />
      <label htmlFor="modelName"> Name of your model</label>
      <Input
        type="text"
        className="w-80 text-black"
        value={imageZipUrl}
        onChange={(e) => setImageZipUrl(e.target.value)}
        placeholder="your-name/your-model"
      />
      <label>
        {" "}
        If the model is not "stability-ai/sdxl" write the
        "ownerName/ownerModel/version"{" "}
      </label>
      <Input
        type="text"
        className="w-80 text-black"
        value={imageZipUrl}
        onChange={(e) => setImageZipUrl(e.target.value)}
        placeholder="stability-ai/sdxl/d830ba5dabf8090ec0db6c10fc862c6eb1c929e1a194a5411852d25fd954ac82"
      />
      <h3> Images to train</h3>
      <UploadDropzone
        uploader={uploader}
        options={uploaderOptions}
        // onUpdate={
        //   (files) => console.log("update", files)
        //   // console.log(files.map((x) => x.fileUrl).join("\n"))
        // }
        onComplete={(files) => {
          console.log("files", files);
          basicUpload(files);
        }}
        width="600px"
        height="375px"
      />*/}
      <Input
        type="text"
        className="w-80 text-white font-bold"
        value={imageZipUrl}
        onChange={(e) => setImageZipUrl(e.target.value)}
        placeholder="https://example.com/your-images.zip"
      />
      <Button
        onClick={TrainPhoto}
        className="bg-blue-600 self-center text-lg rounded-xl text-white font-medium px-10 py-8 mt-8 hover:bg-blue-500 transition">
        {!loadingTraining ? <h3>submit training</h3> : <h3>wait training</h3>}
      </Button>
      <div>{JSON.stringify(trainingResponse)}</div>
    </main>
  );
}

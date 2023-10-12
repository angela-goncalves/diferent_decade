"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
// import { Uploader } from "uploader";
// import { UploadDropzone } from "react-uploader";

export default function uploadImg() {
  const [error, setError] = useState("");
  const [predictionImage, setPredictionImage] = useState("");
  const [loadingPredictions, setLoadingPredictions] = useState(false);
  const [loadingTraining, setLoadingTraining] = useState(false);
  const [imageZipUrl, setImageZipUrl] = useState("");
  const [prompt, setPrompt] = useState("");
  const [file, setFile] = useState<File | undefined>();

  const baseURL = process.env.VERCEL_URL
    ? "https://" + process.env.VERCEL_URL
    : "http://localhost:3000";

  //   const uploader = Uploader({
  //     apiKey: !!process.env.BYTESCALE_UPLOAD_PUBLIC
  //       ? process.env.BYTESCALE_UPLOAD_PUBLIC
  //       : "free",
  //   });
  //   const uploaderOptions = {
  //     editor: {
  //       images: {
  //         crop: true,
  //         cropRatio: 1,
  //         preview: true,
  //       },
  //     },
  //     maxFileCount: 30,
  //     maxFileSizeBytes: 1048576099999,
  //     metadata: {
  //       myCustomField1: true,
  //       myCustomField2: {
  //         hello: "world",
  //       },
  //       anotherCustomField: 42,
  //     },
  //     mimeTypes: ["image/jpeg"],
  //     multi: true,
  //     // onInit: Function,
  //     // onUpdate: Function,
  //     // onValidate: Function,
  //     // path: {
  //     //   fileName: "image.jpg",
  //     //   fileNameFallback: "image.jpg",
  //     //   fileNameVariablesEnabled: true,
  //     // folderPath: "/uploads",
  //     // folderPathVariablesEnabled: true,
  //     // },
  //     showFinishButton: true,
  //     showRemoveButton: true,

  //     // multi: true,

  //     // // Comment out this line & use 'onUpdate' instead of
  //     // // 'onComplete' to have the dropzone close after upload.
  //     // showFinishButton: true,

  //     styles: {
  //       colors: {
  //         primary: "#d946ef",
  //       },
  //     },
  //   };
  //   async function generatePhoto() {
  //     await new Promise((resolve) => setTimeout(resolve, 200));
  //     setLoadingPredictions(true);
  //     const res = await fetch(`${baseURL}/api/predictions`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ photo: file, prompt: prompt }),
  //     });
  //     console.log("res generated", res);
  //     let newPhoto = await res.json();
  //     if (res.status !== 200) {
  //       setError(newPhoto);
  //     } else {
  //       setPredictionImage(newPhoto[0]);
  //     }
  //     setTimeout(() => {
  //       setLoadingPredictions(false);
  //     }, 1300);
  //   }
  // console.log("predictionImage", predictionImage);
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

    setLoadingTraining(false);
    // setTimeout(() => {
    // }, 1300);
    return res;
  }

  //   async function basicUpload(files: any) {
  //     await new Promise((resolve) => setTimeout(resolve, 200));
  //     setLoadingTraining(true);
  //     const res = await fetch(`${baseURL}/api/upload`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         accountId: process.env.BYTESCALE_UPLOAD_ACCOUNT_ID,
  //         apiKey: process.env.BYTESCALE_UPLOAD_PUBLIC,
  //         requestBody: files, // Or: pass a 'file' object from an input element.
  //       }),
  //     });
  //     console.log("res", res);
  //     const uploadRespose = await res.json();
  //     console.log("uploadRespose", uploadRespose);
  //     // if (res.status !== 200) {
  //     //   setError(newPhoto);
  //     // } else {
  //     //   setPredictionImage(newPhoto[0]);
  //     // }
  //     setTimeout(() => {
  //       setLoadingTraining(false);
  //     }, 1300);
  //   }

  return (
    <div>
      <label> Your replicate key to train </label>
      {/* <Input
        type="text"
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
        className="w-80 text-white"
        value={imageZipUrl}
        onChange={(e) => setImageZipUrl(e.target.value)}
        placeholder="https://example.com/your-images.zip"
      />
      <Button onClick={TrainPhoto}>
        {!loadingTraining ? <h3>submit training</h3> : <h3>wait training</h3>}
      </Button>
      {/* <h3>Prompt:</h3>
      <div className="flex">
        <Input
          type="text"
          className="w-80 text-black"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="describe your wish image"
        />

        <h3>in style of TOK (this is already added, so dont worry about it)</h3>
      </div> */}
      {/* <input
        type="file"
        accept="image/jpeg, image/png, image/jpg"
        onChange={(event) => {
          if (event.target.files) {
            console.log("file", event.target.files[0]);
            setFile(event.target.files[0]);
          }
        }}
      /> */}

      {/* <Button onClick={generatePhoto}>
        {loadingPredictions ? <h3>wait</h3> : <h3>generate</h3>}
      </Button>
      {!loadingPredictions && predictionImage && (
        <Image
          src={predictionImage}
          width={512}
          height={512}
          alt="the image generated"
        />
      )} */}
    </div>
  );
}

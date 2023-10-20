"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { UrlBuilder } from "@bytescale/sdk";
import { UploadWidgetConfig } from "@bytescale/upload-widget";
import { UploadDropzone } from "@bytescale/upload-widget-react";
import { CompareSlider } from "../../components/CompareSlider";
import LoadingDots from "../../components/LoadingDots";
import ResizablePanel from "../../components/ResizablePanel";
import Toggle from "../../components/Toggle";
import appendNewToName from "../../utils/appendNewToName";
import downloadPhoto from "../../utils/downloadPhoto";
import DropDown from "../../components/DropDown";
import { genderType, genders } from "../../utils/dropdownTypes";
import { Button } from "../../components/ui/button";

export default function DreamPage() {
  const [originalPhoto, setOriginalPhoto] = useState<string | null>(null);
  const [restoredImage, setRestoredImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [restoredLoaded, setRestoredLoaded] = useState<boolean>(false);
  const [sideBySide, setSideBySide] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [gender, setGender] = useState<genderType>("Woman");

  const options: UploadWidgetConfig = {
    apiKey: !!process.env.NEXT_PUBLIC_UPLOAD_API_KEY
      ? process.env.NEXT_PUBLIC_UPLOAD_API_KEY
      : "free",
    maxFileCount: 1,
    mimeTypes: ["image/jpeg", "image/png", "image/jpg"],
    editor: { images: { crop: false, preview: true } },
    styles: {
      colors: {
        primary: "#F262E4", // Primary buttons & links
        error: "#d23f4d", // Error messages
        shade100: "#000000", // Standard text
        shade200: "#fffe", // Secondary button text
        shade300: "#fffd", // Secondary button text (hover)
        shade400: "#fffc", // Welcome text
        shade500: "#fff9", // Modal close button
        shade600: "#F7F032", // Border
        shade700: "#fff2", // Progress indicator background
        shade800: "#fff1", // File item background
        shade900: "#ffff", // Various (draggable crop buttons, etc.)
      },
    },
    showFinishButton: true,
  };

  const UploadDropZone = () => (
    <UploadDropzone
      options={options}
      width="670px"
      onComplete={(originalFile) => {
        if (originalFile.length !== 0) {
          const image = originalFile[0];
          const imageName = image.originalFile.originalFileName;
          const imageUrl = UrlBuilder.url({
            accountId: image.accountId,
            filePath: image.filePath,
            options: {
              transformation: "preset",
              transformationPreset: "thumbnail",
            },
          });
          setPhotoName(imageName);
          setOriginalPhoto(imageUrl);
          generatePhoto(imageUrl);
        }
      }}
      height="250px"
    />
  );

  async function generatePhoto(fileUrl?: string) {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 200));

      const res = await fetch("/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originalPhoto: fileUrl, theme: gender }),
      });

      let newPhoto = await res.json();

      if (res.status !== 200) {
        setError(newPhoto);
      } else {
        setRestoredImage(newPhoto);
        setRestoredLoaded(true);
      }
    } catch (error) {
      setError("oops! something wrong happened");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-2 min-h-screen">
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-4 sm:mb-0 mb-8 ">
        <h1 className="mx-auto max-w-2xl font-display text-4xl font-bold tracking-normal sm:text-6xl mb-5">
          Generate your photo in{" "}
          <span className="text-[#F7F032]">80s style</span>
        </h1>
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="flex w-full justify-between items-center flex-col mt-4 ">
              {!originalPhoto && (
                <>
                  <div className="space-y-4 w-full max-w-sm">
                    <div className="flex mt-3 items-center space-x-3">
                      <Image
                        src="/number-1-white.svg"
                        width={30}
                        height={30}
                        alt="1 icon"
                      />
                      <p className="text-left font-medium">Gender</p>
                    </div>
                    <DropDown
                      gender={gender}
                      setGender={(newTheme) =>
                        setGender(newTheme as typeof gender)
                      }
                      genders={genders}
                    />
                  </div>
                  <div className="mt-4 w-full max-w-sm">
                    <div className="flex mt-6 w-96 items-center space-x-3">
                      <Image
                        src="/number-2-white.svg"
                        width={30}
                        height={30}
                        alt="2 icon"
                      />
                      <p className="text-left font-medium">
                        Upload your picture.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col w-full max-w-[600px] mt-2">
                    <UploadDropZone />
                  </div>
                </>
              )}
              {restoredImage && (
                <div>
                  Here's your remodeled in the <b>{gender.toLowerCase()}</b>{" "}
                  theme!{" "}
                </div>
              )}
              <div
                className={`${
                  restoredLoaded ? "visible mt-6 -ml-8" : "invisible"
                }`}>
                <Toggle
                  sideBySide={sideBySide}
                  setSideBySide={(newVal) => setSideBySide(newVal)}
                />
              </div>
              {restoredLoaded && sideBySide && (
                <CompareSlider
                  original={originalPhoto!}
                  restored={restoredImage!}
                />
              )}
              {restoredImage && originalPhoto && !sideBySide && (
                <div className="flex sm:space-x-4 sm:flex-row flex-col">
                  <div>
                    <h2 className="mb-1 font-medium text-lg">Original image</h2>
                    <Image
                      alt="original photo"
                      src={originalPhoto}
                      className="rounded-2xl relative w-full h-96"
                      width={475}
                      height={475}
                    />
                  </div>
                  <div className="sm:mt-0 mt-8">
                    <h2 className="mb-1 font-medium text-lg">
                      Generated Image
                    </h2>
                    <a href={restoredImage} target="_blank" rel="noreferrer">
                      <img
                        alt="restored photo"
                        src={restoredImage}
                        className="rounded-2xl relative sm:mt-0 mt-2 cursor-zoom-in w-full h-96"
                        width={475}
                        height={475}
                      />
                    </a>
                  </div>
                </div>
              )}
              {loading && (
                <Button disabled>
                  <span>
                    <LoadingDots color="white" style="large" />
                    this could take a while
                  </span>
                </Button>
              )}
              {error && (
                <div
                  className="bg-red-100 text-red-700 px-4 py-3 rounded-xl mt-8"
                  role="alert">
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
              <div className="flex space-x-2 justify-center">
                {originalPhoto && !loading && (
                  <Button
                    onClick={() => {
                      setOriginalPhoto(null);
                      setRestoredImage(null);
                      setRestoredLoaded(false);
                      setError(null);
                    }}>
                    Generate New Image
                  </Button>
                )}
                {restoredLoaded && (
                  <Button
                    onClick={() => {
                      downloadPhoto(
                        restoredImage!,
                        appendNewToName(photoName!)
                      );
                    }}>
                    Download Generated Image
                  </Button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
      </main>
    </div>
  );
}

import Image from "next/image";
import { LinkCust } from "../components/ui/link";

export default function HomePage() {
  return (
    <div className="py-2 min-h-screen">
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-20 mt-20">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal sm:text-7xl">
          Transport to 80s decade{" "}
          <span className="relative text-[#F7F032]">using AI</span>
        </h1>

        <div className="flex justify-between items-center w-full flex-col sm:mt-10 mt-6">
          <div className="flex flex-col space-y-10 mt-4 mb-16">
            <div className="flex sm:space-x-8 sm:flex-row flex-col">
              <div>
                <h3 className="mb-1 font-medium text-lg">Original photo</h3>
                <Image
                  alt="Original photo of a person with different-decade.io"
                  src="/original2.jpg"
                  className="w-full object-cover h-96 rounded-2xl"
                  width={400}
                  height={400}
                />
              </div>
              <div className="sm:mt-0 mt-8">
                <h3 className="mb-1 font-medium text-lg">Generated photo</h3>
                <Image
                  alt="Generated photo of a person with different-decade.io"
                  width={400}
                  height={400}
                  src="/generated2.jpg"
                  className="w-full object-cover h-96 rounded-2xl sm:mt-0 mt-2"
                />
              </div>
            </div>
          </div>
        </div>
        <LinkCust
          variant="button"
          className="font-medium px-4 py-3 text-xl"
          href="/dream">
          Generate photo here
        </LinkCust>
      </main>
    </div>
  );
}

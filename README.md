# [diferent_decade](https://diferent-decade.vercel.app/) - generate a photo in 80s decade with AI

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/angela-goncalves/diferent_decade&env=REPLICATE_API_KEY&project-name=diferent_decade&repo-name=diferent_decade)



https://github.com/angela-goncalves/diferent_decade/assets/66344422/e9f691ab-94e5-4a3d-b563-10e3bb00b640



## How it works

It uses an SDXL model called [stability-ai/sdxl](https://replicate.com/stability-ai/sdxl) trained with images from the 80s to generate images and then it uses a [faceswap](https://replicate.com/lucataco/faceswap) to give you a photo of you dress like in the 80s. This application gives you the ability to upload a photo of you, which will send it through this ML Model using a Next.js API route, and generated your image. The ML Model is hosted on [Replicate](https://replicate.com) and [Bytescale](https://www.bytescale.com/) is used for image storage.

## Running Locally

### Cloning the repository the local machine.

```bash
git clone (https://github.com/angela-goncalves/diferent_decade.git)
```

### Creating a account on Replicate to get an API key.

1. Go to [Replicate](https://replicate.com/) to make an account.
2. Click on your profile picture in the top left corner, and click on "API Tokens".
3. Here you can find your API token. Copy it.

### Storing the API keys in .env

Create a file in root directory of project with env. And store your API key in it, as shown in the .example.env file.

If you'd also like to do rate limiting, create an account on UpStash, create a Redis database, and populate the two environment variables in `.env` as well. If you don't want to do rate limiting, you don't need to make any changes.

### Installing the dependencies.

```bash
npm install
```

### Running the application.

Then, run the application in the command line and it will be available at `http://localhost:3000`.

```bash
npm run dev
```

## One-Click Deploy

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=vercel-examples):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/angela-goncalves/diferent_decade&env=REPLICATE_API_KEY&project-name=diferent_decade&repo-name=diferent_decade)

## License

This repo is MIT licensed.

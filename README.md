# ED Next.js Starter Kit 2025

This is a starter kit template that includes a [Next.js](https://nextjs.org/) app paired with [Sanity Studio](https://www.sanity.io/) for content and data management.  


## Tech Stack 

- Next.js
- Sanity (Studio, Media, Presentation, Vision)
- Tailwind 4.0 
- GSAP
- Biome

## Getting Started

### Prerequisites

#### 1. Install Node.js

Download and install Node.js (version 22 or later) from [nodejs.org](https://nodejs.org/).

Verify your installation:
```shell
node --version
npm --version
```

#### 2. Install Dependencies

Navigate to this project directory and install all dependencies:

```shell
npm install
```

#### 3. Biome in VSCode

This project uses Biome for formatting and linting. To configure it properly in VS Code:

1. **Install the Biome extension:**
   - Open VS Code
   - Go to Extensions (Ctrl/Cmd + Shift + X)
   - Search for "Biome" and install the official Biome extension

2. **Configure Biome as your default formatter:**
   - Open VS Code Settings (Ctrl/Cmd + ,)
   - Search for "default formatter"
   - Set "Editor: Default Formatter" to "biomejs.biome"

3. **Enable format on save (recommended):**
   - In VS Code Settings, search for "format on save"
   - Check "Editor: Format On Save"

## Development

#### 1. Run the Development Servers

Running the following command will launch the local development server alongside Sanity Studio simultaneously.

```shell
npm run dev
```

This command runs:
- Next.js app at [http://localhost:3000](http://localhost:3000)
- Sanity Studio at [http://localhost:3333/structure](http://localhost:3333/structure)

#### 2. Access the Applications

- **Next.js App:** Open [http://localhost:3000](http://localhost:3000) in your browser
- **Sanity Studio:** Open [http://localhost:3333/structure](http://localhost:3333/structure) in your browser

You'll need to sign in to Sanity Studio using the same service (Google, GitHub, or email) that you used when setting up your Sanity project.

## Available Scripts

- `npm run dev` - Start both development servers
- `npm run lint` - Run ESLint on the frontend
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run import-sample-data` - Import sample data to Sanity

### Deploying your application

#### 1. Deploy Sanity Studio

Your Next.js frontend (`/frontend`) and Sanity Studio (`/studio`) are still only running on your local computer. It's time to deploy and get it into the hands of other content editors.

Back in your Studio directory (`/studio`), run the following command to deploy your Sanity Studio.

```shell
npx sanity deploy
```

#### 2. Deploy Next.js app to Vercel

You have the freedom to deploy your Next.js app to your hosting provider of choice. With Vercel and GitHub being a popular choice, we'll cover the basics of that approach.

1. Create a GitHub repository from this project. [Learn more](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github).
2. Create a new Vercel project and connect it to your Github repository.
3. Set the `Root Directory` to your Next.js app.
4. Configure your Environment Variables.

## Resources

- [Sanity documentation](https://www.sanity.io/docs)
- [Next.js documentation](https://nextjs.org/docs)
- [Join the Sanity Community](https://slack.sanity.io)
- [Learn Sanity](https://www.sanity.io/learn)

## Frequently Asked Questions

### How can I add a new module to Sanity Studio?
1. Create a new terminal and run the command below.

```shell
npm run plop
```

2. Select the `New module` option, name your module, and it will generate a Sanity schema file for you in `studio/src/schemas/modules/your-new-schema.ts` and a new component file in `frontend/components/YourNewComponent/YourNewcomponent.tsx`.

3. Add your new schema to `schema.ts`, `page.ts`, and `moduleTypes` in `studio/src/schemas`. Don't forget to add any accompanying Sanity preview images for your module to `studio/src/static/previews`.

4. Create a new GROQ query for your Sanity schema in `frontend/sanity/queries/queries.ts`. Make good use of commonly used fields from `sharedFields.ts`.

5. Note that if your schema and query are not used within the module builder, then you can create a fetch query for your data in `fetch.ts` so you can use it in your components directly.

6. Add your new schema and component to `ModuleBuilder.tsx`.

7. Create a new terminal and run `npm run typegen` to generate your types. 

8. Your module now appears in Sanity Studio within any module builder.

## TODO 

- [ ] Add tests. Vitest? Jest? React Testing Library? 
- [ ] Add any missing essential packages? estoolkit? 
- [ ] Update sharedFields.ts
- [ ] Update README


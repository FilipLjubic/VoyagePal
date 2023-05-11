
# VoyagePal - Your AI-Powered Travel Companion


VoyagePal is a user-friendly, AI-powered mobile app that revolutionizes vacation planning by offering personalized itineraries, intriguing facts about desired destinations, and curated recommendations for activities, restaurants, and accommodations.

Features and Challenges:

1. AI-Powered Vacation Planner:
Feature: VoyagePal leverages the power of ChatGPT to provide users with bespoke vacation itineraries tailored to their preferences, budget, and travel dates.
Challenges:
- Seamlessly integrating ChatGPT API into the app and ensuring accurate responses.
- Regularly updating the app to accommodate changes to the AI engine and improve the quality of suggestions.

2. Fun Facts:
Feature: Our app delights users with fascinating facts about their chosen destinations while allowing users to report any inaccuracies.
Challenges:
- Curating a reliable and regularly updated database of engaging information for different destinations.
- Establishing an effective system for users to report incorrect fun facts and ensuring timely updates.

3. Personalized Recommendations:
Feature: VoyagePal offers curated recommendations for restaurants, attractions, and accommodations based on user preferences and historical data, with options to save favorite places.
Challenges:
- Creating a recommendation system that accurately reflects user preferences.
- Encouraging users to provide feedback on recommendations to refine the system continually.

4. Interactive Map:
Feature: Our user-friendly interactive map displays recommended locations and points of interest, empowering users to visualize and navigate their vacation plans with ease.
Challenges:
- Integrating the map feature with the AI-generated recommendations, ensuring accurate location data.
- Designing a user-friendly map interface that facilitates vacation planning.

5. In-app Messaging:
Feature: VoyagePal's intuitive messaging interface enables users to communicate with ChatGPT, asking questions and receiving prompt, accurate responses to assist with their vacation planning.
Challenges:
- Developing an intuitive and user-friendly messaging interface.
- Ensuring that the AI can understand and respond to a wide range of user queries effectively.

VoyagePal is set to redefine the vacation planning experience with its AI-powered platform, offering personalized itineraries, engaging destination facts, and curated recommendations. By overcoming the challenges associated with these innovative features, we aim to create an unparalleled travel companion that caters to the diverse needs of modern travelers.


# Create T3 App (extended)

This is an extended version of the [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app` that includes:

- UI Components using [shadcn/ui](https://ui.shadcn.com) - which is built on top of [Radix UI](https://radix-ui.com) & [Tailwind CSS](https://tailwindcss.com)
- Full-Stack CRUD example with tRPC mutations (protected routes) using the UI components together with [react-hook-form](https://react-hook-form.com).
- E2E Testing using [Playwright](https://playwright.dev)
- Integration tests using [Vitest](https://vitest.dev).
- Docker Compose setup for local database
- [`@next/font`] for optimized fonts

[Try it out now!](https://t3-complete.vercel.app)

## Getting Started

1. Install deps

```bash
pnpm install
```

2. Start the db

```bash
docker compose up -d
```

3. Update env and push the schema to the db

```bash
cp .env.example .env
pnpm prisma db push
```

4. Start the dev server

```bash
pnpm dev
```

5. Run the tests

```bash
pnpm test
```

---

## Adding shadcn components

```bash
pnpx shadcn-ui add [component]
```

Example:

```bash
pnpx shadcn-ui add alert-dialog
```

List of all components:

```bash
pnpx shadcn-ui add
```

[You can also see them here](https://ui.shadcn.com/components)

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

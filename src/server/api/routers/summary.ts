import fs from "fs";
import {
  ChatCompletionResponseMessage,
  Configuration,
  OpenAIApi,
} from "openai";
import { z } from "zod";

import { summaryPrompt, type DestinationGeneral } from "~/utils/summaryUtils";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const openai = new OpenAIApi(
  new Configuration({
    organization: process.env.OPENAI_ORG_ID,
    apiKey: process.env.OPENAI_API_KEY,
  }),
);

export const summaryRouter = createTRPCRouter({
  example: publicProcedure
    .input(
      z.object({
        destination: z.string(),
      }),
    )
    .query(async ({ input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1));

      const { destination } = input;

      return { destination };
    }),
  prompt: publicProcedure
    .input(
      z.object({
        destination: z.string(),
      }),
    )
    .query((req) => {
      // const response = await openai.createChatCompletion({
      //   model: "gpt-3.5-turbo",
      //   messages: [
      //     {
      //       role: "system",
      //       content: summaryPrompt(req.input.destination),
      //     },
      //   ],
      //   temperature: 0.01,
      // });

      const response: DestinationGeneral = JSON.parse(
        fs.readFileSync("./public/summaryTest.json", "utf8"),
      ) as DestinationGeneral;

      fs.writeFileSync(
        "./public/summaryTest.json",
        JSON.stringify(response, null, 2),
      );

      return response;
    }),
});

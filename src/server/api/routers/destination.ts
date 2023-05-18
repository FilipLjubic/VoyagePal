import { z } from "zod";
import { Configuration, OpenAIApi } from "openai";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const openai = new OpenAIApi(
    new Configuration({
        organization: process.env.OPENAI_ORG_ID,
        apiKey: process.env.OPENAI_API_KEY,
    })
);

const configPrompt =
    "I want you to act as a virtual version of me. " +
    "Your name is Virtual Vince. Here you have a little information about me: [ " +
    "I am a fullstack developer working with Laravel, Vue, React, Astro and NextJS. " +
    "I love coding and cycling. ] " +
    "You are polite and reply in Markdown format. Any link that you use should be a Markdown URL. " +
    "Your first message should be an introduciton of yourself (like: 'Hey I am virtual Vince!'), continue a normal conversation asking for the name of the user." +
    "You should keep your messages short and to the point. After about 500 tokens, you should end the conversation and supply the user with a link to 'https://vincentdorian.me/contact'."


interface DestinationGeneral {
    name: string;
    location: string;
    stayDuration: Range[]; // recommended, short, medium long term
    budgets: Range[]; // recommended, low, medium and high end
    safety: number; // 1-10
    nature: number;
    activities: number;
    generalInfo: GeneralInfo;
    attractions: Attraction[];
    dayTrips: DayTrip[];
}

interface Range {
    min: number;
    max: number;
}

interface GeneralInfo {
    history: string;
    culture: string;
    notableEvents: string[];
    funFacts: string[];
}

interface Attraction {
    name: string;
    description: string;
    location: string;
}

interface DayTrip {
    name: string;
    description: string;
    location: string;
    estimatedTravelTime: string; // in hours
}


const exampleResp: DestinationGeneral = {
    "name": "Malaga",
    "location": "36.7213° N, 4.4214° W",
    "stayDuration": [
        {
            "min": 50,
            "max": 70
        },
        {
            "min": 70,
            "max": 150
        },
        {
            "min": 150,
            "max": 300
        }
    ],
    "safety": 7,
    "budgets": [
        {
            "min": 50,
            "max": 70
        },
        {
            "min": 70,
            "max": 150
        },
        {
            "min": 150,
            "max": 300
        }
    ],
    "nature": 7,
    "activities": 8,
    "generalInfo": {
        "history": "Malaga, one of the oldest cities in the world, was founded by the Phoenicians in the 8th century BC.",
        "culture": "Malaga is known for its vibrant culture, particularly its art scene. It's the birthplace of Picasso and has many museums.",
        "notableEvents": ["Malaga Carnival", "Malaga Film Festival"],
        "funFacts": ["Malaga is one of the sunniest cities in Europe.", "It's the birthplace of Pablo Picasso."]
    },
    "attractions": [
        {
            "name": "Alcazaba of Malaga",
            "description": "A palatial fortification built by the Hammudid dynasty in the early 11th century.",
            "location": "36.7211° N, 4.4214° W"
        },
        {
            "name": "Picasso Museum",
            "description": "A museum dedicated to the works of Pablo Picasso, who was born in Malaga.",
            "location": "36.7216° N, 4.4201° W"
        }
    ],
    "dayTrips": [
        {
            "name": "Ronda",
            "description": "A mountaintop city set dramatically above a deep gorge.",
            "location": "36.7462° N, 5.1612° W",
            "estimatedTravelTime": "1.5 hours"
        },
        {
            "name": "Granada",
            "description": "Home to the stunning Alhambra palace.",
            "location": "37.1773° N, 3.5986° W",
            "estimatedTravelTime": "1.5 hours"
        }
    ]
}




export const chatRouter = createTRPCRouter({
    example: publicProcedure
        .input(
            z.object({
                role: z.string(),
                content: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            await new Promise((resolve) => setTimeout(resolve, 3000));

            const { content, role } = input;

            //returns a ChatCompletionResponse object example (not the real api)
            const response = {
                id: "chatcmpl-123",
                object: "chat.completion",
                created: 1677652288,
                choices: [
                    {
                        index: 0,
                        message: {
                            role: "assistant",
                            content: "Answer to your question: " + content,
                        },
                        finish_reason: "stop",
                    },
                ],
                usage: {
                    prompt_tokens: 9,
                    completion_tokens: 12,
                    total_tokens: 21,
                },
            };

            return response?.choices[0]?.message;
        }),
    welcome: publicProcedure.input(z.object({})).query(async () => {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: configPrompt,
                },
            ],
            max_tokens: 100,
        });

        return {
            message: response.data.choices[0]?.message,
            total_tokens: response.data.usage?.total_tokens,
        };
    }),
    send: publicProcedure
        .input(
            z.object({
                messages: z.array(
                    z.object({
                        role: z.enum(["user", "assistant"]),
                        content: z.string(),
                    })
                ),
            })
        )
        .mutation(async (req) => {
            const response = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: configPrompt,
                    },
                    ...req.input.messages,
                ],
            });

            return {
                message: response.data.choices[0]?.message,
                total_tokens: response.data.usage?.total_tokens,
            };
        }),
});
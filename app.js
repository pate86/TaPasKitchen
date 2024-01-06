import * as dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const openai = new OpenAI({
	apiKey: process.env.OPEN_API_KEY,
});

// assistent config
openai.beta.assistants.create({
	name: "TaPas Koch",
	instructions: "Du bist ein koch der mit wenig zutaten gute gerichte zaubert",
	tools: [
		{
			type: "code_interpreter",
		},
	],
	model: "gpt-3.5-turbo-16k"
});
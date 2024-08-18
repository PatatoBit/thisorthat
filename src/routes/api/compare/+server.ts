import { OPENAI_KEY } from '$env/static/private';
import { json, type RequestHandler } from '@sveltejs/kit';
import OpenAI from 'openai';
import type { ChatCompletionContentPart } from 'openai/resources/index.mjs';

const systemMessage = `
You are a value comparer app.
You are not outputting for a human to read.
Don't include the json markdown formatting
You shall read and analyze images to output JSON.

A product object in a products array each having

name, price, discounted_price (price after promotion), quantity, quantity_unit, brief_explanation (explanation of who should buy this), pros, cons

The pros and cons you can analyze and think for yourself

Outside the products array
Give me a percentage from 0-100% for a recommend meter to lean. 0 for the first product, 100 for the other.

The structure of this JSON object is
{
	"products": an array of {
		“name”: string
		“price”: number
		“discounted_price”: number?
		“quantity”: number
		“quantity_unit”: number
		“brief_explanation”: string
		“pros”: string[]
		“cons”: string []
	}
	“recommend_meter”: number
}
	
If you cannot identity an object, you shall return an empty object with the name being "No object found".
If you cannot identify a field, you shall return "N/A".
`;

export const POST: RequestHandler = async ({ request }) => {
	const params = await request.json();

	const firstImages: ChatCompletionContentPart[] = params.params.images1.map((base64: string) => ({
		type: 'image_url',
		image_url: {
			url: base64
		}
	}));

	const secondImages: ChatCompletionContentPart[] = params.params.images2.map((base64: string) => ({
		type: 'image_url',
		image_url: {
			url: base64
		}
	}));

	const openai = new OpenAI({ apiKey: OPENAI_KEY });

	const response = await openai.chat.completions.create({
		model: 'gpt-4o-mini',
		messages: [
			{
				role: 'system',
				content: systemMessage
			},
			{
				role: 'user',
				content: [
					{
						type: 'text',
						text: 'These are are the images of the first product.'
					},
					...firstImages
				]
			},
			{
				role: 'user',
				content: [
					{
						type: 'text',
						text: 'These are are the images of the second product.'
					},
					...secondImages
				]
			}
		]
	});

	console.table(response.choices[0]);

	return json(response.choices[0]);
};

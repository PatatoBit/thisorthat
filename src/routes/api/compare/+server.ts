import { json } from '@sveltejs/kit';
import OpenAI from 'openai';
import { OPENAI_KEY } from '$env/static/private';

const systemMessage = `
You are a value comparer app. You shall read these images and give me a JSON response including.

A product object in a products array each having
name, price, discounted_price, quantity, quantity_unit, brief_explanation, pros, cons

Outside the products array
Give me a percentage from 0-100% for a recommend meter to lean. 0 for the first product, 100 for the other.

The structure of this JSON object is
{
	products: an array of {
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
If you cannot identify a field, you shall return null.
`;

export async function GET({ request }) {
	const openai = new OpenAI({ apiKey: OPENAI_KEY });

	try {
		const data = await request.formData();
		const image = data.get('image');

		if (!image) {
			return json({ error: 'No image found' });
		}
	} catch (error) {
		console.error(error);
	}

	const response = await openai.chat.completions.create({
		model: 'gpt-4-vision-preview',

		messages: [
			{ role: 'system', content: systemMessage },
			{
				role: 'user',
				content: []
			}
		],
		max_tokens: 1000
	});

	return await json(response.choices[0]);
}

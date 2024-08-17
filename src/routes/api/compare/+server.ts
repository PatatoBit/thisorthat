import { OPENAI_KEY } from '$env/static/private';
import { json, type RequestHandler } from '@sveltejs/kit';
import OpenAI from 'openai';

const systemMessage = `
You are a value comparer app.
You are not outputting for a human to read.
Don't include the json markdown formatting
You shall read and analyze images to output JSON.

A product object in a products array each having

name, price, discounted_price, quantity, quantity_unit, brief_explanation, pros, cons

The pros and cons you can analyze and think for yourself

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

export const GET: RequestHandler = async () => {
	const openai = new OpenAI({ apiKey: OPENAI_KEY });
	// const { image1, image2 } = await request.json();
	// console.log(image1, image2);

	const response = await openai.chat.completions.create({
		model: 'gpt-4o',
		messages: [
			{
				role: 'system',
				content: systemMessage
			},
			{
				role: 'user',
				content: [
					{
						type: 'image_url',
						image_url: {
							url: 'https://media.discordapp.net/attachments/891657091008315393/1274270100706562048/IMG_0665.jpg?ex=66c1a402&is=66c05282&hm=425b0ab5da061d9001fc043f4ae8be248497f2d55c471e9cf57ae2612b43fb3f&=&format=webp&width=1530&height=1142',
							detail: 'low'
						}
					},
					{
						type: 'image_url',
						image_url: {
							url: 'https://media.discordapp.net/attachments/891657091008315393/1274270100928856074/IMG_0664.jpg?ex=66c1a402&is=66c05282&hm=ce9e59287aa16d8910430802152652f05f7a28f258be4e057101fb9baf3fda4d&=&format=webp&width=1610&height=1144',
							detail: 'low'
						}
					}
				]
			}
		]
	});

	return json(response.choices[0]);
};

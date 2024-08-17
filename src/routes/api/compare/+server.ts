import { json } from '@sveltejs/kit';
import OpenAI from 'openai';
import { OPENAI_KEY } from '$env/static/private';

export async function GET() {
	const openai = new OpenAI({ apiKey: OPENAI_KEY });

	const response = await openai.chat.completions.create({
		model: 'gpt-3.5-turbo',
		messages: [
			{ role: 'system', content: 'You are a helpful assistant.' },
			{ role: 'user', content: 'Hello, what are you?' }
		]
	});

	return await json(response.choices[0]);
}

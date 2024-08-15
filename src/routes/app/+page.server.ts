import type { Actions } from '@sveltejs/kit';
import { OPENAI_KEY } from '$env/static/private';
import { OpenAI } from 'openai';

interface UserInput {
	image: File;
	description: string;
}

export const actions: Actions = {
	compare: async ({ request }) => {
		console.log('compare', request.body);

		const formData = await request.formData();
		const userInput: UserInput = {
			image: formData.get('image') as File,
			description: formData.get('description') as string
		};

		console.table(userInput);

		// OpenAI
		console.log('OPENAI_KEY', process.env.OPENAI_KEY);

		const openai = new OpenAI({ apiKey: OPENAI_KEY });
		const response = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages: [
				{
					role: 'system',
					content: 'You are a helpful assistant.'
				},
				{
					role: 'user',
					content: 'Hi'
				}
			]
		});

		console.log(response);
		return response;
	}
};

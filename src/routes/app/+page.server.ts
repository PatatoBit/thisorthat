import type { Actions } from '@sveltejs/kit';

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
	}
};

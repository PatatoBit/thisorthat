export interface Person {
	name: string;
	fullName: string;
	birth?: string;
	number: number | string;
	image: string;
	description: string;
}

export const people: Person[] = [
	{
		name: 'Pat',
		fullName: 'Chayapat Pakham',
		birth: '30-03-2008',
		number: '21',
		image: 'https://placehold.co/500',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, varius velit'
	},
	{
		name: 'Thun',
		fullName: 'Thunwa Klomklung',
		birth: '12-12-2012',
		number: 22,
		image: 'https://placehold.co/500',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, varius velit'
	},
	{
		name: 'Tong',
		fullName: 'Tongthai Klomklung',
		birth: '01-01-2015',
		number: 23,
		image: 'https://placehold.co/500',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, varius velit'
	},
	{
		name: 'Poom',
		fullName: 'Poom Sakulthai',
		birth: '01-01-2015',
		number: 24,
		image: 'https://placehold.co/500',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, varius velit'
	},
	{
		name: 'Pang',
		fullName: 'Pangthai Klomklung',
		birth: '01-01-2015',
		number: 25,
		image: 'https://placehold.co/500',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, varius velit'
	}
];

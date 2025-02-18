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
		name: 'Peak',
		fullName: 'พิชญ์ธนัช คำวิลัย',
		birth: '01-01-2015',
		number: 34,
		image: '/people/Peak.jpg',
		description: 'โปสเตอร์'
	},
	{
		name: 'Amy',
		fullName: 'สุกฤตา เพ็ชรวรุณ',
		birth: '01-01-2015',
		number: 17,
		image: '/people/Amy.jpg',
		description: 'สไลด์'
	},
	{
		name: 'Proud',
		fullName: 'สุพิชญา คุณวัฒน์',
		birth: '01-01-2015',
		number: 18,
		image: '/people/Proud.jpg',
		description: 'สไลด์'
	},
	{
		name: 'Pat',
		fullName: 'ชยพัทธ์​ ผาคำ',
		birth: '30-03-2008',
		number: 21,
		image: '/people/Pat.jpeg',
		description: 'เว็ปไซต์'
	},
	{
		name: 'Thun',
		fullName: 'ธันยวัชร์ อัศวมาศบันลือ',
		birth: '12-12-2012',
		number: 32,
		image: '/people/Thun.jpg',
		description: 'รายงาน'
	},
	{
		name: 'Buga',
		fullName: 'ปูรณ์ภัสสร ห้วยหงหษ์ทอง',
		birth: '01-01-2015',
		number: 34,
		image: '/people/Buga.jpg',
		description: 'สไลด์'
	}
];

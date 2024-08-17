export interface ProductData {
	name: string;
	price: number;
	discounted_price: number;
	quantity: number;
	quantity_unit: string;
	brief_explanation: string;
	pros: string[];
	cons: string[];
}

export interface CompareData {
	products: ProductData[];
	recommend_meter: number;
}

export interface InputData {
	images: FileList;
	description: string;
}

export interface ProductData {
	name: string;
	price: number | undefined;
	discounted_price: number | undefined;
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

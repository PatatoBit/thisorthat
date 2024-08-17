export interface Product {
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
	products: Product[];
	recommend_meter: number;
}

export interface CartItem {
    quantity: number;
    product: Product;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    imageId: number;
    quantity: number;
    available: boolean;
    price: number;
    imageUrl: string;
}

export interface MenuItem {
    id: number;
    name: string;
    description: string;
    available: boolean;

    imageId: number;
    imageUrl: string;
    quantity: number;
    price: number;

    createdAt: Date;
    updatedAt: Date;
}

export interface MenuItemForm {
    name: string;
    description: string;
    quantity: number;
    available: boolean;
    image: FileList;
    price: number;
}

export interface MenuEditInfoForm {
    name: string;
    description: string;
    quantity: number;
    available: boolean;
    price: number;
}
export interface MenuEditImgForm {
    image: FileList;
}

export interface MenuFormAttributes {
    mode: "edit" | "new";
}

export interface MenuItem {
    id: number;
    name: string;
    description: string;
    available: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface MenuFormAttributes {
    setItems: (value: MenuItem[]) => void;
    Items: MenuItem[];
    setAddMode: (value: boolean) => void;
}

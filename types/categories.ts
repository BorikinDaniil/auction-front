export type CategoryParams = {
    name: string;
}

type SubCategory = {
    id: number;
    name: string;
}

export type Category = {
    id: number;
    name: string;
    subCategories: SubCategory[]
}

export type CategoriesList = Category[]
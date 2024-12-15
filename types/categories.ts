export type CategoryParams = {
  name?: string;
  id?: number;
};

export type SubCategory = {
  id: number;
  name: string;
};

export type SubCategories = SubCategory[];

export type Category = {
  id: number;
  name: string;
  subCategories: SubCategory[];
};

export type CategoriesList = Category[];

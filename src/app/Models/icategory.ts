import { IBrand } from "./ibrand";

export interface Data {
    success: boolean;
    message: string;
    data:    DataClass;
}

export interface DataClass {
    categories: ICategory[];
    category:ICategory ;
}

export interface ICategory {
    brands: IBrand[];
    id:     number;
    name:   string;
}

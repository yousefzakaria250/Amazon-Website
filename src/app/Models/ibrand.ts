import { IProduct } from "./iproduct";

export interface Data {
    success: boolean;
    message: string;
    data:    DataClass;
}

export interface DataClass {
    brands: IBrand[];
    brand: IBrand;
}


export interface IBrand {

    products:   IProduct[];
    id:         number;
    name:       string;
    categoryId: number;

}



export interface Data {
    success: boolean;
    message: string;
    data:    DataClass;
}

export interface DataClass {
   // products: IProduct[];
    categoryName: string;
    brandName:    string;
    product:      IProduct;
    products: DataProduct[];
    productsOffer: IProduct[];
    filterdProducts: IProduct[];
}

export interface DataProduct {
    product:  IProduct ;
    brandName: string;
    catName:   string;
}
export interface IProduct {
    id:number ,
    name:string,
    discount:      number;
    price:         number;
    discountPrice: number;
    quantity:number,
    description:string ,
    brandId:number ,
    productImages: ProductImage[]; 
}
export interface ProductImage {
    id:        number;
    path:      string;
    productId: number;
}


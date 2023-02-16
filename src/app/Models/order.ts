export interface OrderDetails {
    userId:        string;
    totalPrice:    number;
    paymentMethod: string;
    address:       string;
    street:        string;
    orderItems:    OrderItems;
}

export interface OrderItems {
    productId: number;
    quantity:  number;
    price:     number;
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { IProduct } from '../Models/iproduct';
import { OrderDetails, OrderItems } from '../Models/order';
import { OrderService } from '../Services/order.service';
import { ProductApiService } from '../Services/product-api.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  Paymentarr: any = ['Cash', 'visa'];
  orderFormGroup: FormGroup;
  order: OrderDetails = {} as OrderDetails;
  orderItm: OrderItems = {} as OrderItems;
  success = false;
  errMessage = ''
  inputValue=''
  product:IProduct|undefined=undefined;
  currentprodID:number
  price:number
  name:string
  Quantity:number
  constructor(private formbuilder: FormBuilder, private orderApiService: OrderService, private router: Router,
    private prodApiService:ProductApiService,private activedRoute: ActivatedRoute) {
    {
      this.orderFormGroup = this.formbuilder.group({
        paymentMethod: ['', [Validators.required]],
        quantity: ['', [Validators.required]],
        address: ['', [Validators.required]],
        street: ['', [Validators.required],],
      })
    }
  }
  getRxcui(event){

    this.inputValue =String( Number(event.target.value)*this.price);
    console.log(this.inputValue);
 
 }
  changePayment(e: any) {
    this.paymentMethod?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  // Access formcontrols getter
  get paymentMethod() {
    return this.orderFormGroup.get('paymentMethod');
  }
  get quantity() {
    return this.orderFormGroup.get('quantity');
  }
  get address() {
    return this.orderFormGroup.get('address');
  }
  get street() {
    return this.orderFormGroup.get('street');
  }

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe(paramMap =>{
      // 
      this.currentprodID=(paramMap.get('prodid'))?Number(paramMap.get('prodid')):0;
      this.prodApiService.getProductById(this.currentprodID).subscribe(prod => {
      this.price=prod.data.product.discountPrice
      this.Quantity = prod.data.product.quantity
      this.name = prod.data.product.name
      console.log(this.price);
      
       });     
    })
  }
  CreateOrder() {

    if(this.quantity.value > this.Quantity)
    {
      alert("Required Quantity is More than Existed") ;
      return 
    }
    this.orderItm.productId =  this.currentprodID;

    this.orderItm.quantity = this.quantity.value;
    this.orderItm.price = this.price;
    console.log(this.orderItm.quantity)
    this.order.userId = localStorage.getItem('userId');
    this.order.totalPrice = (this.orderItm.price*this.orderItm.quantity);
    this.order.address = this.address.value;
    this.order.street = this.street.value;
    this.order.paymentMethod = this.paymentMethod.value;
    this.order.orderItems = this.orderItm;
    console.log(this.order)
    this.orderApiService.CreateOrder(this.order).subscribe(
      {
        next: (res) => {
          if (res.success == true) {
            this.success = true
            console.log(res.message);
          }
          else {
            console.log(res.message);
          }
        }
        , error: (err) => {
            this.errMessage = "something went error please try again";
            console.log(this.errMessage);
        }
      }) 
  }
}

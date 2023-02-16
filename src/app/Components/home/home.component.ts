import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartModel } from 'src/app/Models/cart-model';
import { IBrand } from 'src/app/Models/ibrand';
import { IProduct } from 'src/app/Models/iproduct';
import { BrandApiService } from 'src/app/Services/brand-api.service';
import { CartService } from 'src/app/Services/cart.service';
import { ProductApiService } from 'src/app/Services/product-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  brandList: IBrand[] = [];
  productOfferList: IProduct[] = [];
  productBestSellerList: IProduct[] = [];
  productMostPopularList: IProduct[] = [] ;
  
  constructor(private productApiService: ProductApiService, private cartService: CartService,private brandApiService: BrandApiService, private route: Router) { 
    
    this.brandApiService.getAllBrands().subscribe(brand=>{
      this.brandList=brand.data.brands
    })

    this.productApiService.getProductMostPopular().subscribe(prod=>{
      this.productMostPopularList = prod.data.productsOffer      
    })

    this.productApiService.getProductOffer().subscribe(prod=>{
      this.productOfferList = prod.data.productsOffer
    })
    this.productApiService.getProductBestSeller().subscribe(prod=>{
      this.productBestSellerList = prod.data.productsOffer
    })

   
  }

  ngOnInit(): void {
  }
  openPrdDetails(prdID: number) {

    // this.route.navigate(['path',parameter])
    this.route.navigate(['Products', prdID]);
  }
  openBrandDetails(brandID: number) {

    // this.route.navigate(['path',parameter])
    this.route.navigate(['Brands', brandID]);
  }
  
}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBrand } from 'src/app/Models/ibrand';
import { IProduct } from 'src/app/Models/iproduct';
import { BrandApiService } from 'src/app/Services/brand-api.service';
import { ProductApiService } from 'src/app/Services/product-api.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  currentBrandID:number=0;
  brand: IBrand | undefined = undefined; 
  productList:IProduct[]=[]

  constructor(private brandApiService:BrandApiService,private activedRoute: ActivatedRoute, private route: Router){}
  
  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe(paramMap =>{
      // 
      this.currentBrandID=(paramMap.get('brandid'))?Number(paramMap.get('brandid')):0;
      this.brandApiService.getBrandById(this.currentBrandID).subscribe(brand => {
        this.brand = brand.data.brand
        this.productList = brand.data.brand.products
        console.log(this.productList);       
       });     
      })
  }
  openPrdDetails(prdID: number) {

    // this.route.navigate(['path',parameter])
    this.route.navigate(['Products', prdID]);
  }
}

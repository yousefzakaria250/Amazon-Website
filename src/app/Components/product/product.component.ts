import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { IBrand } from 'src/app/Models/ibrand';
import { ICategory } from 'src/app/Models/icategory';
import { IProduct } from 'src/app/Models/iproduct';
import { CategoryApiService } from 'src/app/Services/category-api.service';
import { ProductApiService } from 'src/app/Services/product-api.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() receivedBrandID: number = 0;
  @Input() receivedCatId: number = 0;

  @Input() receivedCatName: string = "";
  category: ICategory | undefined = undefined;
  id: number = 0;
  brandList: IBrand[] = [];
  productList: IProduct[] = [];
  prdListOfBrand: IProduct[] = [];


  constructor(private catApiService: CategoryApiService, private route: Router) {

}


 

  ngOnInit(): void {
  }

  ngOnChanges(): void {

    if (this.receivedBrandID == 0) {
      this.productList=[];
      this.catApiService.getCategoryById(this.receivedCatId).subscribe(cat => {
        this.category = cat.data.category
        

        cat.data.category.brands.forEach(prod => {
          prod.products.forEach(p=>{
            this.productList.push(p)
          })
          
          this.prdListOfBrand = this.productList;
        })
      });

    }
    else {
      this.getProductsOfBrandID();
    }
  }
  private getProductsOfBrandID() {
    this.prdListOfBrand = this.productList.filter((prd) => prd.brandId == this.receivedBrandID);
  }
  openPrdDetails(prdID: number) {

    // this.route.navigate(['path',parameter])
    this.route.navigate(['Products', prdID]);
  }
}
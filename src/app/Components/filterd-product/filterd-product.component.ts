import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/Models/iproduct';
import { ProductApiService } from 'src/app/Services/product-api.service';

@Component({
  selector: 'app-filterd-product',
  templateUrl: './filterd-product.component.html',
  styleUrls: ['./filterd-product.component.css']
})
export class FilterdProductComponent implements OnInit {
  name:string ;
  ProductFiltered:IProduct[] =[] ;
  constructor(private prdService : ProductApiService , private router : Router , private activateRoute : ActivatedRoute) { 
    this.activateRoute.paramMap.subscribe(paramMap => {
      this.name =  paramMap.get('term')
      console.log(this.name);
      this.prdService.getFilteredProducts(this.name).subscribe(prd=> {
        this.ProductFiltered = prd.data.filterdProducts;
      } )
    });
  }
  
  

  ngOnInit(): void {
  }

  openPrdDetails(prdID: number) {
    this.router.navigate(['Products', prdID]);
  }


}

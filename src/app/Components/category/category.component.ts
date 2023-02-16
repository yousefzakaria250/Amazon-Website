import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { IBrand } from 'src/app/Models/ibrand';
import { ICategory } from 'src/app/Models/icategory';
import { CategoryApiService } from 'src/app/Services/category-api.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  dataProd:Data|undefined=undefined;
  category:ICategory|undefined=undefined;
  currentcatID:number=0;
  currentcatName:string="";
  catID:number=0;
  brandList: IBrand[] = [];
  selectedBrandID: number = 0;

  constructor(private catApiService:CategoryApiService,private activedRoute: ActivatedRoute){}
  
  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe(paramMap =>{
      // 
      this.currentcatID=(paramMap.get('catid'))?Number(paramMap.get('catid')):0;
      this.catApiService.getCategoryById(this.currentcatID).subscribe(cat => {
        this.category = cat.data.category
        this.currentcatName = cat.data.category.name
        this.catID=cat.data.category.id
        console.log(this.currentcatID);
    
        this.catApiService.getCategoryById(this.currentcatID).subscribe(cat => { this.category = cat.data.category
        this.brandList=cat.data.category.brands;
        });        
       });     
    })

  }


}

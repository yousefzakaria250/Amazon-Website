import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { ICategory } from 'src/app/Models/icategory';
import { IProduct } from 'src/app/Models/iproduct';
import { CategoryApiService } from 'src/app/Services/category-api.service';
import { UserApiService } from 'src/app/Services/user-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isuserlogged:boolean=false;
  categoryList: ICategory[] = [];

  totalItem:number

  cartProducts:IProduct[]=[]
  constructor(private catApiService:CategoryApiService,private route: Router,public cookieservice:CookieService, public translate:TranslateService , public userApiService:UserApiService) {
    this.catApiService.getAllCategories().subscribe(cat => { this.categoryList = cat.data.categories});
    const value:string = cookieservice.get('language');
    translate.addLangs(['en','ar']);
    if (value) {
      this.translate.setDefaultLang(value);
      translate.use(value);
      this.switchLang(value);
      
    
    }else{
      translate.setDefaultLang('en');
      translate.use('en');
      this.switchLang('en');
    }

  }
  ngOnInit(): void {

    this.isuserlogged = this.userApiService.isUserLogged; 

    if ("MyCart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("MyCart")!);
      this.totalItem = this.cartProducts.length  

  }
}
  openCatDetails(catID: number) {

    // this.route.navigate(['path',parameter])
    this.route.navigate(['Categorys', catID]);
    
  }

  Search(term:any)
  {
    var res = term.target.value ;
    this.route.navigate(['FilteredProduct',res]) ;

  }

  SearchBtn(term:string)
  {
    var res = term ;
    this.route.navigate(['FilteredProduct',res]) ;

  }
  switchLang(lang:string){
     let htmlTag = document.getElementsByTagName('html')[0] as HTMLHtmlElement
   htmlTag.dir = lang === "ar" ? "rtl" : "ltr";
   htmlTag.lang = lang === "ar" ? "ar" : "en";
    this.translate.setDefaultLang(lang);
    this.ChangeCssFile(lang);
    this.translate.use(lang);
    this.cookieservice.set('language',lang,7);
    
  }
  ChangeCssFile(lang:string){
     let headTag = document.getElementsByTagName('head')[0] as HTMLHtmlElement
    let existingLink = document.getElementById('langCSS') as HTMLLinkElement
    let bundlename = lang === "ar" ? "arabicCss.css" : "englishCss.css";
    if (existingLink) {
      existingLink.href = bundlename;
    }
    else{
      let newlink = document.createElement('link');
      newlink.rel = 'stylesheet';
      newlink.type = 'text/css';
      newlink.id = 'langCSS';
      newlink.href = bundlename;
      headTag.appendChild(newlink);
    }

  }
  logout(){
    localStorage.removeItem('token');
    location.reload();
  }

 getuser(){
   return localStorage.getItem('username');
 }

  
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './Components/footer/footer.component';
import { UserRegisterComponent } from './Components/user-register/user-register.component';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { HomeComponent } from './Components/home/home.component';
import { HeaderComponent } from './Components/header/header.component';
import { ProductComponent } from './Components/product/product.component';
import { CategoryComponent } from './Components/category/category.component';
import { BrandComponent } from './Components/brand/brand.component';
import { CartComponent } from './Components/cart/cart.component';
import { LoginComponent } from './Components/login/login.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
 
 
import { NgxPaypalComponent, NgxPayPalModule } from 'ngx-paypal';
import { PaypalComponent } from './Components/paypal/paypal.component';
import { FilterdProductComponent } from './Components/filterd-product/filterd-product.component';
 

import { TranslateLoader,TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
 import {HttpClient, HttpClientModule} from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { CheckoutComponent } from './checkout/checkout.component';



@NgModule({

 
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,

    UserRegisterComponent,
    MainLayoutComponent,
    NotFoundComponent,
    HeaderComponent,
    ProductComponent,
    CategoryComponent,
    BrandComponent,
    CartComponent,
    LoginComponent,
    ProductDetailsComponent,

    PaypalComponent,
    FilterdProductComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FormsModule,
    HttpClientModule,


    NgxPayPalModule,
     
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:httpTranslateLoader,
        deps:[HttpClient]
      }
    }),
           NgbModule,
 

  ],

  exports:[
    CartComponent,
    

    ReactiveFormsModule
  ],
  providers: [
    [CookieService]
  ],
  bootstrap: [AppComponent]
 
    
  
 

})
export class AppModule { }
export function httpTranslateLoader(http:HttpClient){
  return new TranslateHttpLoader(http);
}
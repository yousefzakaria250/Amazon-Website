import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Amazon';
public isMenuCollapsed = true;
constructor(public translate:TranslateService,public cookieservice:CookieService
  ){
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
 
}

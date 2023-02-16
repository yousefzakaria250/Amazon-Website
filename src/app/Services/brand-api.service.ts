import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Data,IBrand } from '../Models/ibrand';
 


@Injectable({
  providedIn: 'root'
})
export class BrandApiService {

  private httpOptions={};
  constructor(private httpClient: HttpClient) { 
    this.httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
  }

  getAllBrands():Observable<Data>{
    return this.httpClient.get<Data>(`${environment.APIBaseURL}/Brand`);
    
  }
  getBrandById(brandId: number): Observable<Data> {
    return this.httpClient.get<Data>(`${environment.APIBaseURL}/Brand/${brandId}`);
  }
}

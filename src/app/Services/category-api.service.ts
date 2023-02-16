import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Data, ICategory } from '../Models/icategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryApiService {

  private httpOptions={};
  constructor(private httpClient: HttpClient) {
    this.httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
   }

   getAllCategories():Observable<Data>{
    return this.httpClient.get<Data>(`${environment.APIBaseURL}/Category`);
  }
  getCategoryById(catId: number): Observable<Data> {
    return this.httpClient.get<Data>(`${environment.APIBaseURL}/Category/${catId}`);
  }
}

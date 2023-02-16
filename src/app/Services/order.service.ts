import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderDetails } from '../Models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private httpOptions={};
  constructor(private httpClient: HttpClient) {
    this.httpOptions={ 
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
  }
  
  public CreateOrder(order: OrderDetails): Observable<any> {
    return this.httpClient.post<any>(`${environment.APIBaseURL}/Order/Add`, order);
  }
}
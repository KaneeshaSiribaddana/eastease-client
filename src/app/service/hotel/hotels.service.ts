import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHotel } from '../../models/Hotel';
import {ApiResponse} from '../../models/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {
apiurl="http://localhost:8080/api/v1/hotels";
  constructor(private http:HttpClient) { }

  getHotels():Observable<ApiResponse<IHotel[]>>{
return this.http.get<ApiResponse<IHotel[]>>(`${this.apiurl}`);
  }
  getHotelByID(id:number):Observable<ApiResponse<IHotel>>{
    return this.http.get<ApiResponse<IHotel>>(`${this.apiurl}/${id}`);
  }
  createHotel(hotel:IHotel):Observable<ApiResponse<IHotel>>{
    return this.http.post<ApiResponse<IHotel>>(`${this.apiurl}`,hotel);
  }

  updateHotel(id:number,hotel:IHotel):Observable<ApiResponse<IHotel>>{
    return this.http.post<ApiResponse<IHotel>>(`${this.apiurl}/${id}`,hotel);
  }
  deactivateHotel(id: number): Observable<any> {
    return this.http.put<any>(`${this.apiurl}/deactivate/${id}`, null);
  }
}

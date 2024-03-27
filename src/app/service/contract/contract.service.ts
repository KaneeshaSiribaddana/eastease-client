import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HotelContract } from '../../models/HotelContract'; // Assuming the HotelContract model is defined in 'HotelContract.ts'
import { ApiResponse } from '../../models/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  apiurl = "http://localhost:8080/api/v1/hotel-contracts"; // Update the API URL accordingly
  constructor(private http: HttpClient) { }

  getContracts(): Observable<ApiResponse<HotelContract[]>> {
    return this.http.get<ApiResponse<HotelContract[]>>(`${this.apiurl}`);
  }

  getContractByID(id: number): Observable<ApiResponse<HotelContract>> {
    return this.http.get<ApiResponse<HotelContract>>(`${this.apiurl}/${id}`);
  }

  createContract(contract: HotelContract): Observable<ApiResponse<HotelContract>> {
    return this.http.post<ApiResponse<HotelContract>>(`${this.apiurl}`, contract);
  }

  updateContract(id: number, contract: HotelContract): Observable<ApiResponse<HotelContract>> {
    return this.http.post<ApiResponse<HotelContract>>(`${this.apiurl}/${id}`, contract);
  }

  deactivateContract(id: number): Observable<any> {
    return this.http.put<any>(`${this.apiurl}/deactivate/${id}`, null);
  }
}

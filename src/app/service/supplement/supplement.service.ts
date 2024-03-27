import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISupplement } from '../../models/Supplement'; // Assuming the ISupplement interface is defined in 'Supplement.ts'
import { ApiResponse } from '../../models/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class SupplementService {
  apiurl = "http://localhost:8080/api/v1/supplements"; // Update the API URL accordingly
  constructor(private http: HttpClient) { }

  getSupplements(): Observable<ApiResponse<ISupplement[]>> {
    return this.http.get<ApiResponse<ISupplement[]>>(`${this.apiurl}`);
  }

  getSupplementByID(id: number): Observable<ApiResponse<ISupplement>> {
    return this.http.get<ApiResponse<ISupplement>>(`${this.apiurl}/${id}`);
  }

  createSupplement(supplement: ISupplement): Observable<ApiResponse<ISupplement>> {
    return this.http.post<ApiResponse<ISupplement>>(`${this.apiurl}`, supplement);
  }

  updateSupplement(id: number, supplement: ISupplement): Observable<ApiResponse<ISupplement>> {
    return this.http.post<ApiResponse<ISupplement>>(`${this.apiurl}/${id}`, supplement);
  }

  deactivateSupplement(id: number): Observable<any> {
    return this.http.put<any>(`${this.apiurl}/deactivate/${id}`, null);
  }
}

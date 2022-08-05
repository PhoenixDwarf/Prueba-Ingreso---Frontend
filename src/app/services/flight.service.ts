import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse, Flight, Flightrequest } from '../interfaces/interfaces.interface';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  newRequest$ = new EventEmitter<Flightrequest>();

  private apiUrl:string = environment.apiUrl;

  constructor(private http:HttpClient) { }

  getFlights0():Observable<ApiResponse[]>{
    return this.http.get<ApiResponse[]>(`${this.apiUrl}0`);
  }

  getFlights1():Observable<ApiResponse[]>{
    return this.http.get<ApiResponse[]>(`${this.apiUrl}1`);
  }

  getFlights2():Observable<ApiResponse[]>{
    return this.http.get<ApiResponse[]>(`${this.apiUrl}2`);
  }

}

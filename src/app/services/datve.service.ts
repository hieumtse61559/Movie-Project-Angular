import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ve } from '../models/ve';

@Injectable({
  providedIn: 'root'
})
export class DatveService {

  public store = new BehaviorSubject({});
  public statusBooking = this.store.asObservable();


  constructor(private _http:HttpClient) { 
    this.store.next(false);
  }

  LayDanhSachPhongVe(maLichChieu:any): Observable<any>{
    let url = `https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`;
    return this._http.get(url);
  }

  DatVe(ticket:any): Observable<any>{
    const user = JSON.parse(localStorage.getItem("nguoiDungDangNhap") as string);
    const accessToken = user.accessToken;
    const api = "https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/DatVe";

    const headerDict = {
      'Content-Type': 'application/json;',
      'Accept': 'application/json;json;',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization': 'bearer ' + accessToken
    }
    const requestOptions = {                                                                       
      headers: new HttpHeaders(headerDict), 
    };
    
    return this._http.post(api, ticket, requestOptions);
  }
}

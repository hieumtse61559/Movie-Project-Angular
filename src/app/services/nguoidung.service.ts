import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { account } from '../models/account';
import { NguoiDung } from '../models/nguoidung';

@Injectable({
  providedIn: 'root'
})
export class NguoidungService {

  constructor(private _http:HttpClient) { }
  LayDanhSachNguoiDung():Observable<any>{
    let url = "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP10";
    let obServe = this._http.get(url);
    return obServe;
  }

  ThemNguoiDung(nguoiDung: NguoiDung):Observable<any>{
    let url = "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung";
    // let header = new HttpHeaders();
    // header.append('Content-Type','application/json;charset=UTF-8');
    const headerDict = {
      'Content-Type': 'application/json;charset=UTF-8',
      'Accept': 'application/json;json;charset=UTF-8',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization': 'bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYm9naWEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJRdWFuVHJpIiwibmJmIjoxNjIwOTkyNTYzLCJleHAiOjE2MjA5OTYxNjN9.KkEdQlQXmLSeE_QR2B_i5Lk_95EaPWQTIhEkA9R9DFo"
    }
    const requestOptions = {                                                                       
      headers: new HttpHeaders(headerDict), 
    };

    let obServe = this._http.post(url, nguoiDung, requestOptions)
    return obServe
  }

  DangNhap(account: account):Observable<any>{
    const url = "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap";
    let obServe = this._http.post(url, account);
    return obServe;
  }
}

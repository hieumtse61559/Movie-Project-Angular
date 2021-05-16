import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhimService {

  constructor(private _http: HttpClient) { }
  LayDanhSachPhim():Observable<any>{
    let url = "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP10";
    return this._http.get(url)
  }

  LayThongTinPhim(maPhim:any):Observable<any>{
    let url = `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`;
    return this._http.get(url)
  }
}

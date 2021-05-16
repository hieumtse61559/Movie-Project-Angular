import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatveService {

  constructor(private _http:HttpClient) { }

  LayDanhSachPhongVe(maLichChieu:any): Observable<any>{
    let url = `https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`;
    return this._http.get(url);
  }
}

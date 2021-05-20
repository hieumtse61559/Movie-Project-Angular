import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RapphimService {

  constructor(private _http:HttpClient) { }

  layThongTinHeThongRap():Observable<any>{
    const api = "https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap";
    return this._http.get(api);
  }

  layThongTinCumRapTheoHeThong(maHeThongRap:any):Observable<any>{
    const api = `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`;
    return this._http.get(api);
  }

  layThongTinLichChieuHeThongRap(maHeThongRap:any):Observable<any>{
    const api =`https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=GP10`;
    return this._http.get(api);
  }

  layThongTinLichChieuPhim(maPhim:any):Observable<any>{
    const api = `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`;
    return this._http.get(api);
  }
}

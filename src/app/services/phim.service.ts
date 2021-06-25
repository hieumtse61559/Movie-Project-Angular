import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhimService {

  // Lưu ý chỗ store này muốn lưu 1 mảng thì phải khởi tạo như thế này
  public store = new BehaviorSubject<any[]>([]);
  public danhSachPhim = this.store.asObservable();

  constructor(private _http: HttpClient) { }
  LayDanhSachPhim():Observable<any>{
    let url = "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP10";
    return this._http.get(url)
  }

  LayThongTinPhim(maPhim:any):Observable<any>{
    let url = `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`;
    return this._http.get(url)
  }

  xoaPhim(maPhim:number, auth_token:string):Observable<any>{
    let url = `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`,
    })
    return this._http.delete(url, {headers});
  }

  themPhimUploadHinh(formData:any):Observable<any>{
    let url = "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh";
    return this._http.post(url, formData);
  }

  
}

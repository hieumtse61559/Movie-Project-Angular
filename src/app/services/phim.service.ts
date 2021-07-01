import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { text } from '@fortawesome/fontawesome-svg-core';
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
    return this._http.delete(url, {headers, responseType: 'text' as const});
  }

  themPhimUploadHinh(formData:any):Observable<any>{
    let url = "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh";
    return this._http.post(url, formData);
  }

  capNhatPhimUpload(formData:any, auth_token:string):Observable<any>{
    let url = "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhimUpload";

    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${auth_token}`,
    //   'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Headers': 'Content-Type',
    //   'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      
    // })
    return this._http.post(url, formData);
  }

 taoLichChieu(dataObj:any):Observable<any>{
  let url = "https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/TaoLichChieu"
  return this._http.post(url, dataObj, {responseType: 'text'} );
 }

  
}

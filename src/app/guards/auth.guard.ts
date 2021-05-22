import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(): boolean {
    const user = JSON.parse(localStorage.getItem("nguoiDungDangNhap") as string);
    if (user && user.maLoaiNguoiDung === "QuanTri") {
      return true;

    }
    return false
  }

}

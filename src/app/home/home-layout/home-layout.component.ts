import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Kiểm tra xem Admin đã đăng nhập chưa để navigate tới dashboard khi vào lại trang web
    if (localStorage.getItem("nguoiDungDangNhap")) {
      const userAccount = JSON.parse(localStorage.getItem("nguoiDungDangNhap") as string);
      if(userAccount.maLoaiNguoiDung === "QuanTri"){
        this.router.navigate(['/admin/dashboard']);
      }
    }
  }

}

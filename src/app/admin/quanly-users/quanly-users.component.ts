import { Component, OnInit } from '@angular/core';
import { NguoidungService } from 'src/app/services/nguoidung.service';

@Component({
  selector: 'app-quanly-users',
  templateUrl: './quanly-users.component.html',
  styleUrls: ['./quanly-users.component.scss']
})
export class QuanlyUsersComponent implements OnInit {

  USERS: User[] = [];
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  users: User[] = [];
  
  constructor(private userService: NguoidungService) { 
  }

  ngOnInit(): void {
    this.userService.LayDanhSachNguoiDung().subscribe(
      (data: User[]) => {
        console.log(data)
        this.USERS = data;
        this.collectionSize = this.USERS.length;
        this.refreshUsers();
        
      }
    )
  }

  refreshUsers() {
    this.users = this.USERS
      .map((user, i) => ({id: i + 1, ...user}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  

}

interface User{
    taiKhoan: string,
    matKhau: string,
    email: string,
    soDt: string,
    maNhom: string,
    maLoaiNguoiDung: string,
    hoTen: string
}
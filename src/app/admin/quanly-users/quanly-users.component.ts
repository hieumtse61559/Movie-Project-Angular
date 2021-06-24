
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { NguoidungService } from 'src/app/services/nguoidung.service';

@Component({
  selector: 'app-quanly-users',
  templateUrl: './quanly-users.component.html',
  styleUrls: ['./quanly-users.component.scss'],
})
export class QuanlyUsersComponent implements OnInit {

  closeResult = '';

  // SUbscribe từ server về và xử lí
  USERS: User[] = [];
  page = 1;
  pageSize = 25;
  collectionSize = 0;
  // Để hiển thị trên table
  users: User[] = [];
  accessToken:string = '';
  
  // Build form cho user
  userForm!: FormGroup;

  
  constructor(private userService: NguoidungService, private modalService: NgbModal, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
    // Lấy accessToken để xử lí 1 số action
    this.accessToken = JSON.parse((localStorage.getItem("nguoiDungDangNhap") as string)).accessToken

    this.userService.LayDanhSachNguoiDung().subscribe(
      (data: User[]) => {
        this.USERS = data;
        this.collectionSize = this.USERS.length;
        this.refreshUsers();
      }
    )

    this.userForm
  }

  createForm() {
    this.userForm= this.fb.group({
      'TaiKhoan': ['', [Validators.required, Validators.maxLength(15), Validators.minLength(6)]],
      'MatKhau' : ['', [Validators.required, Validators.minLength(6)]],
      'HoTen' : ['', [Validators.required]],
      'Email' : ['', [Validators.required]],
      'SoDt' : ['', [Validators.required]],
      'MaNhom' : ['', [Validators.required]],
      'MaLoaiNguoiDung' : ['', [Validators.required]],
    })
  }

  applyFilter(event:any) {
    let filterValue = event.target.value;
    let filterValueLower = filterValue.toLowerCase();
    filterValueLower = filterValue.toLowerCase();
    if(filterValue === '' ) {
        this.users=this.USERS;
    } 
    else {
      this.users = this.USERS.filter((user) => user.hoTen.includes(filterValueLower))
    }
 }

  refreshUsers() {
    this.users = this.USERS
      .map((user, i) => ({id: i + 1, ...user}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  addUser(){
    console.log(this.userForm.value);
    this.userService.ThemNguoiDung(this.userForm.value).subscribe(
      (addSuccess) => {
        console.log(addSuccess);
        window.alert("Add a new user successfully !")

        // Reset form sau khi add thành công
        this.userForm.reset();

        // Lấy lại danh sách để cập nhật vào bảng
        this.userService.LayDanhSachNguoiDung().subscribe(
          (data: User[]) => {
            this.USERS = data;
            this.collectionSize = this.USERS.length;
            this.refreshUsers();
          }
        )
      },
      (addError) => {
        
        window.alert(addError.error)
      }
    )
  }

  deleteUser(user:any): void {
    console.log(user.taiKhoan)
    // Lấy tài khoản ra để gửi lên API
    this.userService.xoaNguoiDung(user.taiKhoan, this.accessToken).subscribe(
      (success) => {
        console.log(success);
        
      },
      (error) => {
        console.log(error);
        // ???? Méo hiểu sao xóa thành công mà nó nhảy vô đây, y như cái vụ đặt vé thành công
        // Lấy lại danh sách người dùng và cập nhật bảng
        this.userService.LayDanhSachNguoiDung().subscribe(
          (data: User[]) => {
            console.log(data)
            this.USERS = data;
            this.collectionSize = this.USERS.length;
            this.refreshUsers();
          }
        )
        
      }
    );
   
  }

  // Open modal
  open(content:any) {
    this.modalService.open(content, 
      {
        centered: true,
      });
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
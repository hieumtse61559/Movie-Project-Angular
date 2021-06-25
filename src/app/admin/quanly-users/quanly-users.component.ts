
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

  abcd: boolean = true;
  closeResult = '';

  // SUbscribe từ server về và xử lí
  USERS: User[] = [];
  page = 1;
  pageSize = 25;
  collectionSize = 0;
  // Để hiển thị trên table
  users: User[] = [];
  accessToken: string = '';

  // Build form cho user
  userForm!: FormGroup;

  // Check state of Modal : Add or Edit
  isEditState: boolean = false;

  constructor(private userService: NguoidungService, private modalService: NgbModal, private fb: FormBuilder) {
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

    this.createForm();

  }

  createForm() {
    this.userForm = this.fb.group({
      'taiKhoan': ['', [Validators.required, Validators.maxLength(15), Validators.minLength(6)]],
      'matKhau': ['', [Validators.required, Validators.minLength(6)]],
      'hoTen': ['', [Validators.required]],
      'email': ['', [Validators.required]],
      'soDt': ['', [Validators.required]],
      // 'MaNhom': ['GP10', [Validators.required]],
      'maLoaiNguoiDung': ['', [Validators.required]],

    })
  }

  applyFilter(event: any) {
    let filterValue = event.target.value;
    let filterValueLower = filterValue.toLowerCase();
    filterValueLower = filterValue.toLowerCase();
    if (filterValue === '') {
      this.refreshUsers();
    }
    else {
      this.users = this.USERS.filter((user) => user.hoTen.toLowerCase().includes(filterValueLower))
    }
  }

  refreshUsers() {
    this.users = this.USERS
      .map((user, i) => ({ id: i + 1, ...user }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  addUser() {
    console.log(this.userForm.value);
    this.userForm.value.maNhom = "GP10";
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

  deleteUser(user: any): void {
    console.log(user.taiKhoan)
    // Lấy tài khoản ra để gửi lên API
    // user.taiKHoan = JSON.parse(user.taiKhoan)
    this.userService.xoaNguoiDung(user.taiKhoan, this.accessToken).subscribe(
      (success) => {
        window.alert(success);

      },
      (error) => {
        console.log(error);
        window.alert("ABC");
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

  // Open modal to add user
  openToAdd(content: any) {
    this.isEditState = false;

    this.modalService.open(content,
      {
        centered: true,
      });
    this.userForm.reset();

  }

  // Open modal to edit user
  openToEdit(content: any, user: any) {
    this.isEditState = true;
    this.modalService.open(content,
      {
        centered: true,
      });

    console.log(user);

    this.userForm.controls['TaiKhoan'].setValue(user.taiKhoan);
    this.userForm.controls['MatKhau'].setValue(user.matKhau);
    this.userForm.controls['HoTen'].setValue(user.hoTen);
    this.userForm.controls['Email'].setValue(user.email);
    this.userForm.controls['SoDt'].setValue(user.soDt);

    // Lưu ý là còn thiếu maNhom GP10 và chưa xử lí được cho nó checked trên malLoaiNguoiDung nên bắt nó chọn lại để nút Confirm undisable
    // this.userForm.controls['MaNhom'].setValue("GP10");


  }

  confirmEdit() {
    // Khi đã ấn được nút này thì object truyền vào đã có 
    /*
    taiKhoan, matKhau, email, soDt, maLoaiNguoiDung, hoTen
    Còn thiếu maNhom là GP10 nên phải thêm vào nữa
    */
    const newEditedDetail = { ...this.userForm.value, maNhom: "GP10" }

    this.userService.capNhatThongTinNguoiDung(newEditedDetail, this.accessToken).subscribe(
      (editSuccess) => {
        window.alert("Edited successfully !")
        // Lấy lại danh sách người dùng và cập nhật bảng
        this.userService.LayDanhSachNguoiDung().subscribe(
          (data: User[]) => {
            console.log(data)
            this.USERS = data;
            this.collectionSize = this.USERS.length;
            this.refreshUsers();
          }
        )

        // Sửa xong thì đóng modal
        this.modalService.dismissAll();
      },
      (editError) => {
        console.log(editError);
        window.alert(editError.error);
      }
    )

  }

}

interface User {
  taiKhoan: string,
  matKhau: string,
  email: string,
  soDt: string,
  maNhom: string,
  maLoaiNguoiDung: string,
  hoTen: string
}
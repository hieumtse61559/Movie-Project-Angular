import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NguoiDung } from 'src/app/models/nguoidung';
import { NguoidungService } from 'src/app/services/nguoidung.service';

@Component({
  selector: 'app-trang-dang-ky',
  templateUrl: './trang-dang-ky.component.html',
  styleUrls: ['./trang-dang-ky.component.scss']
})
export class TrangDangKyComponent implements OnInit {
  @ViewChild('formDangKy') formDK!: NgForm;
  @Output() closeStatus = new EventEmitter<string>();
  mangNguoiDung: NguoiDung[] = [];
  isConfirmPass: boolean = false;
  constructor(private nguoiDungSV: NguoidungService) { }

  
  ngOnInit(): void {
    // Gọi lấy danh sách người dùng ra xem trả về cái gì, nhớ phải subscribe
    this.nguoiDungSV.LayDanhSachNguoiDung().subscribe(
      (kq: any) => {
        console.log(kq)
        this.mangNguoiDung = kq;
      }
    )
  }

  DangKy(nguoiDung: any) {
    console.log(nguoiDung)

    if (nguoiDung.matKhau == nguoiDung.xacNhanMK) {
      this.isConfirmPass = true;
      // Hardcode maNhom và maLoaiNguoiDung vì chỉ để cho khách hàng đăng ký thôi
      const apiAccount = { ...nguoiDung, maNhom: "GP10", maLoaiNguoiDung: "KhachHang" }
      delete apiAccount.xacNhanMK;

      // Gọi API để PUT value(đây là một object bao gồm thông tin người đăng ký)
      this.nguoiDungSV.DangKy(apiAccount).subscribe(
        // Thành công
        (kq: any) => {
          alert("Đăng ký thành công")
          this.formDK.resetForm();
        },
        // Thất bại
        (error: any) => {
          console.log(error)
          alert(error.error);
        }
      )
    }
    else{
      alert("Xác nhận mật khẩu chưa chính xác")
    }
  }

  closeModal(){
    this.closeStatus.emit("Close Modal");
  }

}

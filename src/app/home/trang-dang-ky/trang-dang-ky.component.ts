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

  DangKy(nguoiDung: any) {
    if (nguoiDung.matKhau == nguoiDung.xacNhanMK) {
      this.isConfirmPass = true;
      delete nguoiDung.xacNhanMK;
      // Hardcode maNhom và maLoaiNguoiDung vì chỉ để cho khách hàng đăng ký thôi
      nguoiDung = { ...nguoiDung, maNhom: "GP10", maLoaiNguoiDung: "KhachHang" }
      console.log(nguoiDung)
      // Gọi API để PUT value(đây là một object bao gồm thông tin người đăng ký)
      this.nguoiDungSV.ThemNguoiDung(nguoiDung).subscribe(
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
  ngOnInit(): void {
    // Gọi lấy danh sách người dùng ra xem trả về cái gì, nhớ phải subscribe
    this.nguoiDungSV.LayDanhSachNguoiDung().subscribe(
      (kq: any) => {
        console.log(kq)
        this.mangNguoiDung = kq;
      }
    )
  }

  closeModal(){
    this.closeStatus.emit("Close Modal");
  }

}

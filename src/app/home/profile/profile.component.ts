import {  Component, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { NguoidungService } from 'src/app/services/nguoidung.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userInfo:any ={};
  confirmPass:any;
  lichSuDatVe:any[] = [];
  constructor(private nguoiDungSV: NguoidungService) { }

  ngOnInit(): void {
    // this.userInfo = JSON.parse(localStorage.getItem("nguoiDungDangNhap") as string);
    this.nguoiDungSV.layThongTinNguoiDung({taiKhoan: JSON.parse(localStorage.getItem("nguoiDungDangNhap") as string).taiKhoan}).subscribe(
      (success)=>{
        this.userInfo = success;
        console.log(this.userInfo);
        // Gán mật khẩu cho confirmPass để xử lí
        this.confirmPass = this.userInfo.matKhau;

        // Lấy được thongTinDatVe của tài khoản
        this.lichSuDatVe = this.userInfo.thongTinDatVe.reverse().slice(0,7);
        console.log(this.lichSuDatVe);
      }
    )
  }
  

  // Thay đổi thông tin người dùng rồi bấm Lưu thông tin
  saveProfile(valueProfileForm:any){
    console.log(valueProfileForm) // {matKhau: , soDT: , email:, hoTen:, xacNhanMK}

    delete valueProfileForm.xacNhanMK

    console.log(valueProfileForm) // {matKhau: , soDT:, email:, hoTen:}

    // Phải chạy APi đăng nhập lại để lấy accessToken
    // Lưu ý: để có accessToken bắt buộc phải đăng nhập (đúng taiKhoan và mật khẩu)
    // Nhưng nếu khi bấm nút Lưu thông tin mà có thay đổi mật khẩu thì mật khẩu sẽ bị thay đổi nên không thể chạy đăng nhập lấy accessToken được nên bắt buộc phải chạy lại layThongTinNguoiDung để có mật khẩu cũ mà đăng nhập
    this.nguoiDungSV.layThongTinNguoiDung({taiKhoan: this.userInfo.taiKhoan}).subscribe(
      (oldInfo)=>{
        this.nguoiDungSV.DangNhap({taiKhoan: this.userInfo.taiKhoan, matKhau: oldInfo.matKhau}).subscribe(
          (loginSuccess)=>{
            const accessToken = loginSuccess.accessToken;
            //Nếu có thay đổi mật khẩu thì giá trị mật khẩu mới đã được thay đổi trong form rồi
            valueProfileForm = {...valueProfileForm, taiKhoan: this.userInfo.taiKhoan, maNhom: "GP10", maLoaiNguoiDung: "KhachHang"}
            this.nguoiDungSV.capNhatThongTinNguoiDung(valueProfileForm, accessToken).subscribe(
              (success:any)=>{         
                alert("Cập nhật thông tin thành công");
                localStorage.setItem("nguoiDungDangNhap", JSON.stringify(success))
                this.confirmPass = valueProfileForm.matKhau;
              },
              (error:any)=>{
                alert(error);
              }
            )
          }
        )
      },
      (fail)=>
      {
        console.log(fail);
      }
    )
    
  }
}

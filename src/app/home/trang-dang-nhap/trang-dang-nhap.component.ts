import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NguoidungService } from 'src/app/services/nguoidung.service';

@Component({
  selector: 'app-trang-dang-nhap',
  templateUrl: './trang-dang-nhap.component.html',
  styleUrls: ['./trang-dang-nhap.component.scss']
})
export class TrangDangNhapComponent implements OnInit {

  constructor(private fb:FormBuilder, private nguoiDungSV: NguoidungService, private router: Router) {
    this.createForm();
   }
  formDangNhap!:FormGroup;
  ngOnInit(): void {
    // this.formDangNhap = new FormGroup({
    //   // dòng 16 là một input TaiKhoan với giá trị ban đầu(tham số 1) là null, tham số thứ 2 để validate input đó)
    //   'TaiKhoan': new FormControl('', Validators.required),
    //   // dòng 17 là một input MatKhau với giá trị ban đầu là null
    //   'MatKhau' : new FormControl('', Validators.required)
    // })
  }
  createForm() {
    this.formDangNhap= this.fb.group({
      'TaiKhoan': ['', [Validators.required, Validators.pattern("^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$")]],

      'MatKhau' : ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  Login() {
    console.log(this.formDangNhap.value) // hiển thị tất cả các value của input có trong form
    this.nguoiDungSV.DangNhap(this.formDangNhap.value).subscribe(
      // Đăng nhập thành công
      (success:any) => {
        console.log("Đăng nhập thành công")
        
        if(success.hoTen)
        {
          localStorage.setItem('nguoiDungDangNhap', JSON.stringify(success)); 
          success.maLoaiNguoiDung === "KhachHang" ? this.router.navigate(['/']) : this.router.navigate(['/admin'])
        }
        
      },
      // Đăng nhập thất bại
      (fail: any) => {
        
        alert(fail.error);

      }
    )
  }

}

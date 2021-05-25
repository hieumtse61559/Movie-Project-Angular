import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { DatveService } from 'src/app/services/datve.service';

@Component({
  selector: 'app-datve',
  templateUrl: './datve.component.html',
  styleUrls: ['./datve.component.scss']
})
export class DatveComponent implements OnInit {
  public MaLichChieu?:string;
  public DanhSachGheNgoi?:any[] =[];
  movieDetails:any;
  constructor(private activateRoute:ActivatedRoute, private datveSV: DatveService) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(
      // Lấy được mã lịch chiếu
      (kq) => {
        this.MaLichChieu = kq.malichchieu
        this.datveSV.LayDanhSachPhongVe(this.MaLichChieu).subscribe(
          (result) => {
            console.log(result)
            this.movieDetails = result.thongTinPhim;
            this.DanhSachGheNgoi = result.danhSachGhe.slice(0,120);
            console.log(this.DanhSachGheNgoi)
          }
        )
      },
      (error) => {
        console.log(error)
      }
    )

    // Theo dõi trên store xem là trạng thái đặt vé có thay đổi thành true để gọi lại API lấy danh sách ghế load lại giao diện
    this.datveSV.statusBooking.subscribe(
      (checkStatusBooking) =>{
        if(checkStatusBooking){
          this.datveSV.LayDanhSachPhongVe(this.MaLichChieu).subscribe(
            (result) => {
              console.log(result)
              this.movieDetails = result.thongTinPhim;
              this.DanhSachGheNgoi = result.danhSachGhe;
              console.log(this.DanhSachGheNgoi)
            }
          )
        }
      }
    )
  }

  // layTaiKhoanNguoiDung(){
  //   let nguoiDungHienTai = JSON.parse(localStorage.getItem("nguoiDungDangNhap"));
  //   if(nguoiDungHienTai != null){
  //     return nguoiDungHienTai.taiKhoan;
  //   }
  //   else{
  //     alert("Vui lòng đăng nhập để đặt vé");
  //     return false
  //   }
  // }
}

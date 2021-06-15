import { Component, OnInit } from '@angular/core';
import { RapphimService } from 'src/app/services/rapphim.service';

@Component({
  selector: 'app-cum-rap',
  templateUrl: './cum-rap.component.html',
  styleUrls: ['./cum-rap.component.scss']
})
export class CumRapComponent implements OnInit {

  // lstDanhSachPhim = [[], [], []]
  lstDanhSachPhim: any[] = [];
  lstRapPhim: any[] = []; //đây là danh sách chưa thông tin nhiều rạp phim theo mã hệ thống
  heThongRapName!: string;
  lstCumRap: any[] = [];
  maHeThongRapDefault = "BHDStar";
  maRapDefault = true;
  constructor(private rapphimSV: RapphimService) { }

  ngOnInit(): void {
    this.rapphimSV.layThongTinHeThongRap().subscribe(
      (success) => {
        console.log(success)
        this.lstCumRap = success;
      },
      (error) => {
        alert(error);
      }
    )

    // Hiển thị default khi chạy lần đầu thì mặc định heThongRapName sẽ là BHD
    this.heThongRapName = "BHD Star Cineplex";
    this.rapphimSV.layThongTinLichChieuHeThongRap(this.maHeThongRapDefault).subscribe(
      (success) => {
        this.lstRapPhim = success[0].lstCumRap.map(
          (cumRap: any, index: number) => {
            if (index === 0) {
              // this.hienThiDSPhimTheoRap(cumRap.danhSachPhim)
              this.lstDanhSachPhim = cumRap.danhSachPhim;
            }
            return { tenCumRap: cumRap.tenCumRap, diaChi: cumRap.diaChi, danhSachPhim: cumRap.danhSachPhim }
          });
      }
    );


  }

  handleClickLogo(maHeThongRap: any, tenHeThongRap: any,) {
    this.maRapDefault = true;
    this.heThongRapName = tenHeThongRap;
    this.rapphimSV.layThongTinLichChieuHeThongRap(maHeThongRap).subscribe(
      (success) => {
        console.log(success);
        this.lstRapPhim = success[0].lstCumRap.map(
          (cumRap: any, index: number) => {
            // Lấy phần tử đầu tiên trong danh sách rạp để hiện default
            if (index === 0) {
              this.lstDanhSachPhim = cumRap.danhSachPhim;
            }
            return { tenCumRap: cumRap.tenCumRap, diaChi: cumRap.diaChi, danhSachPhim: cumRap.danhSachPhim }
          });
      },
      (error) => {
        console.log(error);
      }
    )
  }

  hienThiDSPhimTheoRap(dsPhim: any) {
    this.lstDanhSachPhim = dsPhim;
    console.log(this.lstDanhSachPhim);
    this.maRapDefault = false;

  }

}

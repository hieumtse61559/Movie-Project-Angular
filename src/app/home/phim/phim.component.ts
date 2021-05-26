import { Component, OnInit } from '@angular/core';
import { PhimService } from 'src/app/services/phim.service';

@Component({
  selector: 'app-phim',
  templateUrl: './phim.component.html',
  styleUrls: ['./phim.component.scss']
})
export class PhimComponent implements OnInit {
  danhSachPhimDangChieu = [] as any;
  danhSachPhimSapChieu = [] as any;

  dangChieuStatus:boolean = true;
  constructor(private phimSV: PhimService) { }

  ngOnInit(): void {
    this.phimSV.LayDanhSachPhim().subscribe(
      (danhSachPhim)=> {
        this.danhSachPhimDangChieu = danhSachPhim.slice(12,20);
        this.danhSachPhimSapChieu = danhSachPhim.slice(21,29); //15,23
        const danhSachPhimTongHop = this.danhSachPhimDangChieu.concat(this.danhSachPhimSapChieu);
        // Đẩy 2 danh sách lên store để các header có thể lấy mà sử lý việc tìm kiếm
        this.phimSV.store.next(danhSachPhimTongHop);
      },
      (error) => {
        console.log(error)
      }
    )
  }
  hienPhimDangChieu(){
    this.dangChieuStatus = true;
    console.log(this.dangChieuStatus)
  }

  hienPhimSapChieu(){
    this.dangChieuStatus = false;
    console.log(this.dangChieuStatus)
  }

}

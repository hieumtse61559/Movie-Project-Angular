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
        this.danhSachPhimDangChieu = danhSachPhim.slice(0,7);
        this.danhSachPhimSapChieu = danhSachPhim.slice(8,15);
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

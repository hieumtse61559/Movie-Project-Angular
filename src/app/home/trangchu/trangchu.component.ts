import { Component, OnInit } from '@angular/core';
import { Phim } from 'src/app/models/phim';
import { NguoidungService } from 'src/app/services/nguoidung.service';
import { PhimService } from 'src/app/services/phim.service';


@Component({
  selector: 'app-trangchu',
  templateUrl: './trangchu.component.html',
  styleUrls: ['./trangchu.component.scss']
})
export class TrangchuComponent implements OnInit {
  public DanhSachPhim:Phim[] = [];
  constructor(private phimSV: PhimService, private nguoiDungSV: NguoidungService) { }

  ngOnInit(): void {
    this.phimSV.LayDanhSachPhim().subscribe(
      (success:any) => {
        console.log(success)
        this.DanhSachPhim = success;
      },
      (error:any) => {
        console.log(error)
      }
    )

  }

}

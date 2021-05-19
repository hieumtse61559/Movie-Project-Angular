import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhimService } from 'src/app/services/phim.service';

@Component({
  selector: 'app-trangchitiet',
  templateUrl: './trangchitiet.component.html',
  styleUrls: ['./trangchitiet.component.scss']
})
export class TrangchitietComponent implements OnInit {
  public MaPhim?:string;
  public ChiTietPhim:any;
  tenRapChieu!: string
  constructor(private activated:ActivatedRoute, private phimSV:PhimService) { }

  ngOnInit(): void {
    // params của ActivatedRoute là một Observerable
    // Lấy params trên thanh url và subscribe 
    this.activated.params.subscribe(
      (kq) => {
        this.MaPhim = kq.maphim;
        this.phimSV.LayThongTinPhim(this.MaPhim).subscribe(
          (chiTiet) => {
            this.ChiTietPhim = chiTiet;
            // this.tenRapChieu = chiTiet.lichChieu[0].tenCumRap;
          }
        )

      }
    )

  }

}

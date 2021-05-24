import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { PhimService } from 'src/app/services/phim.service';
import { RapphimService } from 'src/app/services/rapphim.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-trangchitiet',
  templateUrl: './trangchitiet.component.html',
  styleUrls: ['./trangchitiet.component.scss']
})
export class TrangchitietComponent implements OnInit {
  public maPhim?:string;
  public chiTietPhim:any;
  tenRapChieu!: string;
  closeResult = '';
  constructor(private activated:ActivatedRoute, private rapphimSV: RapphimService, private modalService: NgbModal) { }

  ngOnInit(): void {
    // params của ActivatedRoute là một Observerable
    // Lấy params trên thanh url và subscribe 
    this.activated.params.subscribe(
      (kq) => {
        this.maPhim = kq.maphim; //maphim này xem bên appRouting
        this.rapphimSV.layThongTinLichChieuPhim(this.maPhim).subscribe(
          (chiTiet)=>{
            console.log(chiTiet);
            this.chiTietPhim = chiTiet;

          },
          (error)=>{
            console.log(error)
            alert(error);
          }
        )
        // this.phimSV.LayThongTinPhim(this.MaPhim).subscribe(
        //   (chiTiet) => {
        //     this.ChiTietPhim = chiTiet;
        //     // this.tenRapChieu = chiTiet.lichChieu[0].tenCumRap;
        //   }
        // )

      }
    )

  }

  open(content:any) {
    this.modalService.open(content, { size: 'lg' , centered: true});
  }
  
}

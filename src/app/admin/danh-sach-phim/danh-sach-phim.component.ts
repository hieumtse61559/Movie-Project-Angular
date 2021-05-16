import { Component, OnInit } from '@angular/core';
import { TransformService } from 'src/app/services/transform.service';

@Component({
  selector: 'app-danh-sach-phim',
  templateUrl: './danh-sach-phim.component.html',
  styleUrls: ['./danh-sach-phim.component.scss']
})
export class DanhSachPhimComponent implements OnInit {

  statusSidebar:boolean = false;
  constructor(private transform: TransformService) { }

  ngOnInit(): void {
  }

  toggleSidebar(){
    this.statusSidebar === false ? this.statusSidebar = true : this.statusSidebar = false;
    this.transform.transformData(this.statusSidebar)
  }
}

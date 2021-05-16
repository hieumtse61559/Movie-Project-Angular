import { Component, OnInit } from '@angular/core';
import { TransformService } from 'src/app/services/transform.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  status:boolean = false;
  constructor(private transform:TransformService) { }

  ngOnInit(): void {
    this.transform.asData.subscribe(
      (kq:any) => {
        this.status = kq
      }
    )
  }

}

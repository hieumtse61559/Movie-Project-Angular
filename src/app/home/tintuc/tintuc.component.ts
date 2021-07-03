import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tintuc',
  templateUrl: './tintuc.component.html',
  styleUrls: ['./tintuc.component.scss']
})
export class TintucComponent implements OnInit {

  dienAnhStatus:boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  hienThiDienAnh(){
    this.dienAnhStatus = true;
    console.log(this.dienAnhStatus)
  }

  hienReview(){
    this.dienAnhStatus = false;
    console.log(this.dienAnhStatus)
  }
}

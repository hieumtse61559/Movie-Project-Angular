import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-phim-sap-chieu',
  templateUrl: './phim-sap-chieu.component.html',
  styleUrls: ['./phim-sap-chieu.component.scss']
})
export class PhimSapChieuComponent implements OnInit {
  @Input() phimSapChieu: any;
  constructor() { }

  ngOnInit(): void {
  }

  owlOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    nav: false,
    autoplay:true,
    autoplayTimeout:3000,
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      760: {
        items: 4
      },
      1000: {
        items: 5
      }
    },
  }
}

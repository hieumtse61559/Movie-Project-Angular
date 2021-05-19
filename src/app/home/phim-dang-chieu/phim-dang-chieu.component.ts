import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-phim-dang-chieu',
  templateUrl: './phim-dang-chieu.component.html',
  styleUrls: ['./phim-dang-chieu.component.scss']
})
export class PhimDangChieuComponent implements OnInit {
  @Input() phimDangChieu: any;

  constructor() { }

  ngOnInit(): void {
    console.log(this.phimDangChieu)
  }

  owlOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
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

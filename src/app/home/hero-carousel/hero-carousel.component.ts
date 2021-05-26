import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';



@Component({
  selector: 'app-hero-carousel',
  templateUrl: './hero-carousel.component.html',
  styleUrls: ['./hero-carousel.component.scss']
})
export class HeroCarouselComponent implements OnInit {
  heroSlideList = [] as any;
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
    autoplay:false,
    autoplayTimeout:3000,
    autoWidth:true,
    responsive : {
      320 :{
        items: 1
      },
      576 :{
        items: 1
      },
      768 :{
        items: 1
      },
      992 :{
        items: 1
      },
      1200 :{
        items: 1
      }
    }
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { TrangchuComponent } from './trangchu/trangchu.component';
import { TrangchitietComponent } from './trangchitiet/trangchitiet.component';
import { TrangdatgheComponent } from './trangdatghe/trangdatghe.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PhimComponent } from './phim/phim.component';
import { TrangDangKyComponent } from './trang-dang-ky/trang-dang-ky.component';
import { TrangDangNhapComponent } from './trang-dang-nhap/trang-dang-nhap.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PipeModule } from '../pipe/pipe.module';
import { DatveComponent } from './datve/datve.component';
import { GheItemComponent } from './ghe-item/ghe-item.component';
import { HeroCarouselComponent } from './hero-carousel/hero-carousel.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { PhimDangChieuComponent } from './phim-dang-chieu/phim-dang-chieu.component';
import { PhimSapChieuComponent } from './phim-sap-chieu/phim-sap-chieu.component';
import { PhimItemComponent } from './phim-item/phim-item.component';



@NgModule({
  declarations: [
    HomeLayoutComponent,
    TrangchuComponent,
    TrangchitietComponent,
    TrangdatgheComponent,
    HeaderComponent,
    FooterComponent,
    PhimComponent,
    TrangDangKyComponent,
    TrangDangNhapComponent,
    DatveComponent,
    GheItemComponent,
    HeroCarouselComponent,
    PhimDangChieuComponent,
    PhimSapChieuComponent,
    PhimItemComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PipeModule,
    CarouselModule,

  ],
  exports: [
    HomeLayoutComponent,
    TrangchuComponent,
    TrangchitietComponent,
    TrangdatgheComponent,
    HeaderComponent,
    FooterComponent,
    PhimComponent,
    TrangDangKyComponent,
    TrangDangNhapComponent,
    HeroCarouselComponent,
  ],
})
export class HomeModule { }

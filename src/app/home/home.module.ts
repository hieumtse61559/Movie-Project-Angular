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
import { CumRapComponent } from './cum-rap/cum-rap.component';
import { ProfileComponent } from './profile/profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TintucComponent } from './tintuc/tintuc.component';
import { IntroComponent } from './intro/intro.component';
import { IsLoadingComponent } from './is-loading/is-loading.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


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
    CumRapComponent,
    ProfileComponent,
    TintucComponent,
    IntroComponent,
    IsLoadingComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PipeModule,
    CarouselModule,
    NgbModule,
    SweetAlert2Module
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
    IsLoadingComponent,

  ],
})
export class HomeModule { }

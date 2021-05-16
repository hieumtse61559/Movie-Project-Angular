import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { QuanlyUsersComponent } from './quanly-users/quanly-users.component';
import { TrangQuanLyPhimComponent } from './trang-quan-ly-phim/trang-quan-ly-phim.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DanhSachPhimComponent } from './danh-sach-phim/danh-sach-phim.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AdminLayoutComponent,
    QuanlyUsersComponent,
    TrangQuanLyPhimComponent,
    SidebarComponent,
    DanhSachPhimComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    AdminLayoutComponent,
    QuanlyUsersComponent,
    TrangQuanLyPhimComponent,
    SidebarComponent,
    DanhSachPhimComponent
  ],
})
export class AdminModule { }

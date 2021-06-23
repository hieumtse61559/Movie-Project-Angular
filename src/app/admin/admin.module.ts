import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { QuanlyUsersComponent } from './quanly-users/quanly-users.component';
import { TrangQuanLyPhimComponent } from './trang-quan-ly-phim/trang-quan-ly-phim.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DanhSachPhimComponent } from './danh-sach-phim/danh-sach-phim.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { ChartsModule } from 'ng2-charts';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  declarations: [
    AdminLayoutComponent,
    QuanlyUsersComponent,
    TrangQuanLyPhimComponent,
    SidebarComponent,
    DanhSachPhimComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    Ng2GoogleChartsModule,
    ChartsModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    
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

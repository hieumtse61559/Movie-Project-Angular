import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { QuanlyUsersComponent } from './admin/quanly-users/quanly-users.component';
import { TrangQuanLyPhimComponent } from './admin/trang-quan-ly-phim/trang-quan-ly-phim.component';
import { AuthGuard } from './guards/auth.guard';
import { DatveComponent } from './home/datve/datve.component';
import { HomeLayoutComponent } from './home/home-layout/home-layout.component';
import { TrangDangKyComponent } from './home/trang-dang-ky/trang-dang-ky.component';
import { TrangDangNhapComponent } from './home/trang-dang-nhap/trang-dang-nhap.component';
import { TrangchitietComponent } from './home/trangchitiet/trangchitiet.component';
import { TrangchuComponent } from './home/trangchu/trangchu.component';
import { TrangdatgheComponent } from './home/trangdatghe/trangdatghe.component';

const routes: Routes = [
  {
    path:'',
    component: HomeLayoutComponent,
    children:[
      {
        path: '',
        component: TrangchuComponent,
      },
      {
        path: 'chitiet/:maphim',
        component: TrangchitietComponent,
      },
      {
        path: 'datve/:malichchieu',
        component: DatveComponent,
      },
      {
        path: 'dangnhap',
        component: TrangDangNhapComponent,
      },
      {
        path: 'dangky',
        component: TrangDangKyComponent,
      }
    ]
  },
  {
    path:'admin',
    component: AdminLayoutComponent,
    canActivate : [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate : [AuthGuard],
      },
      {
        path: 'quanlyphim',
        component: TrangQuanLyPhimComponent
      },
      {
        path: 'quanlynguoidung',
        component: QuanlyUsersComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

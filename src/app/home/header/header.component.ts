import { Component, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NguoidungService } from 'src/app/services/nguoidung.service';
import { PhimService } from 'src/app/services/phim.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isCollapsed:boolean = true;
  hoTenUser!:string;
  clickedTagName!: string
  closeResult!: string;
  isLogined:boolean = false;
  movieID:any;
  constructor(private modalService: NgbModal, private nguoiDungSV : NguoidungService, private phimSV: PhimService, private router:Router) { }
  danhSachPhim:any[] = [];
  
  
  ngOnInit(): void {
    const accountUser = JSON.parse(localStorage.getItem("nguoiDungDangNhap") as string);
    if(accountUser && accountUser.maLoaiNguoiDung =="KhachHang"){
      this.hoTenUser = accountUser.taiKhoan;
      this.nguoiDungSV.storeUser.next(true);
    }

    // Lấy danh sách phim trên store (phim đang chiếu + phim sắp chiếu)
    this.phimSV.danhSachPhim.subscribe(
      (kq)=>{
        this.danhSachPhim = kq.map((phim)=> {
          return {tenPhim: phim.tenPhim, maPhim: phim.maPhim}
        })
        console.log(this.danhSachPhim)
      },
      (error)=>{
        alert(error)
      }
    )
  }

  // Phương thức này mở modal tại trung tâm screen với size lg
  openVerticallyCentered(content:any, tagObj:any) {
    this.modalService.open(content, { centered: true, size: 'xl' });
    this.clickedTagName = tagObj.name;
  }


  getNameFromDangNhap(name:string){
    this.hoTenUser = name;
    this.modalService.dismissAll("Cross click")
  }

  logout(){
    // Xóa localStorage
    localStorage.clear();
    // Reset lại hoTenUser thành rỗng để hiện lại 2 button đăng nhập và đăng ký
    this.hoTenUser = "";
    // Đẩy false lên store để xác nhận là chưa đăng nhập
    this.nguoiDungSV.storeUser.next(false);
  }

  // Đưa input search vào để lấy value, rồi gửi maPhim đi đến trang chi tiết
  handleSearch(searchInput:any){
    console.log(searchInput.value)
    if(searchInput.value){
      this.danhSachPhim.map(
        (phim)=>{
          if(phim.tenPhim == searchInput.value){
            this.movieID = phim.maPhim
          }
        }
      )
      console.log(this.movieID);
      this.router.navigate(['/chitiet', this.movieID]);
    }
  }

  nhanLenhCloseModal(lenh:string){
    if(lenh === "Close Modal"){
      this.modalService.dismissAll();
    }
  }
}

import { Component, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NguoidungService } from 'src/app/services/nguoidung.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  hoTenUser!:string;
  clickedTagName!: string
  closeResult!: string;
  isLogined:boolean = false;
  constructor(private modalService: NgbModal, private nguoiDungSV : NguoidungService) { }

  

  ngOnInit(): void {
    const accountUser = JSON.parse(localStorage.getItem("nguoiDungDangNhap") as string);
    if(accountUser && accountUser.maLoaiNguoiDung =="KhachHang"){
      this.hoTenUser = accountUser.hoTen;
      this.nguoiDungSV.storeUser.next(true);
    }
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
  
}

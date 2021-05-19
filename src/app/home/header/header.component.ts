import { Component, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  hoTenUser!:string;
  clickedButtonName!: string
  closeResult!: string;
  isLogined:boolean = false;
  constructor(private modalService: NgbModal) { }

  

  ngOnInit(): void {
    
  }

  // Phương thức này mở modal tại trung tâm screen với size lg
  openVerticallyCentered(content:any, button:any) {
    console.log(button.name)
    this.modalService.open(content, { centered: true, size: 'lg' });
    this.clickedButtonName = button.name;
  }


  getNameFromDangNhap(name:string){
    this.hoTenUser = name;
    this.modalService.dismissAll("Cross click")
  }

  logout(){
    this.hoTenUser = "";
  }
  
}

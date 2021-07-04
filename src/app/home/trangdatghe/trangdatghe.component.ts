import { AfterViewInit, Component, DoCheck, Input, OnChanges, OnInit, Output, SimpleChange } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ve } from 'src/app/models/ve';
import { DatveService } from 'src/app/services/datve.service';
import { NguoidungService } from 'src/app/services/nguoidung.service';

@Component({
  selector: 'app-trangdatghe',
  templateUrl: './trangdatghe.component.html',
  styleUrls: ['./trangdatghe.component.scss']
})
export class TrangdatgheComponent implements OnInit, OnChanges {
  @Input() gheArray?: any[] = [];
  @Input() maLichChieu?: number;

  danhSachVe: any[] = [];
  soGheDaChon: number = 0;
  soGheConTrong?: number = this.gheArray?.length

  MangGheDaChon = [] as any;
  danhSachGheDaDat: any[] = [];
  totalCost: number = 0;


  constructor(private nguoiDungSV: NguoidungService, private modalService: NgbModal, private datVeSV: DatveService) { }

  ngOnInit(): void {
    console.log(this.gheArray)

  }

  ngOnChanges() {
    this.gheArray?.map((ghe: any) => {
      if (ghe.daDat) {
        this.danhSachGheDaDat.push(ghe);
      }
    })

    this.soGheDaChon = this.danhSachGheDaDat.length;
    this.soGheConTrong = this.gheArray!.length - this.danhSachGheDaDat.length;
  }

  nhanStatusFromGheItem(statusDatGhe: any, gheObj: any) {
    // console.log(statusDatGhe);
    // console.log(gheObj);
    // 
    if (statusDatGhe) {
      // Click chọn ghế
      this.soGheDaChon++;
      this.soGheConTrong!--;
      this.MangGheDaChon.push(gheObj);
      this.danhSachVe.push({ maGhe: gheObj.maGhe, giaVe: gheObj.giaVe })
      this.totalCost = this.totalCost + gheObj.giaVe;
      console.log(this.danhSachVe)
    } else {
      // Click bỏ chọn ghế
      this.soGheDaChon--;
      this.soGheConTrong!++;
      this.MangGheDaChon.map((item: any, index: number) => {
        if (item.maGhe === gheObj.maGhe) {
          this.totalCost = this.totalCost - gheObj.giaVe;
          this.MangGheDaChon.splice(index, 1);
          this.danhSachVe.splice(index, 1)

        }
      })
      console.log(this.danhSachVe);

    }
  }

  handlePay(billModal: any) {
    // Kiểm tra xem đăng nhập hay chưa
    // this.nguoiDungSV.storeUser.subscribe(
    //   (data) => {
    //     console.log(this.nguoiDungSV.storeUser.value) // true: đã đăng nhập, false: chưa đăng nhập
    //     //Chưa đăng nhập
    //     if (this.nguoiDungSV.storeUser.value == false) {
    //       alert("Vui lòng đăng nhập để thanh toán")
    //     } else {
    //       // Đã đăng nhập
    //       // Mở popup hiện #bill lên để người dùng xác nhận thông tin mua vé
    //       this.modalService.open(billModal, { centered: true });
    //     }
    //   },
    //   (error) => {
    //     console.log(error)
    //     alert("error")
    //   }
    // )

    if(localStorage.getItem("nguoiDungDangNhap")){
      // Đã đăng nhập
      this.modalService.open(billModal, { centered: true });
    }else{
      // Chưa đăng nhập
      alert("Vui lòng đăng nhập để thanh toán")
    }
  }

  confirmPayment() {
    const username = JSON.parse(localStorage.getItem("nguoiDungDangNhap") as string).taiKhoan;
    console.log(username);
    if(this.danhSachVe.length > 0){
      let ticket: any = {
        maLichChieu: this.maLichChieu,
        danhSachVe: this.danhSachVe,
        taiKhoanNguoiDung: username,
      }
      this.datVeSV.DatVe(ticket).subscribe(
        (bookSuccess) => {
  
          console.log("success")
          // Gửi trạng thái true lên store để bên datveComponent subscribe nhận biết mà generate lại giao diện với danh sách mới
          this.datVeSV.store.next(true);
  
          // reset lại mảng ghế đã đặt thành rỗng để có gì đặt lại lần sau
          this.MangGheDaChon = [];
          // reset lại tổng tiền luôn
          this.totalCost = 0;
          // đóng modal
          this.modalService.dismissAll();
          alert("Đặt vé thành công")
        },
        (bookFail) => {
          console.log(bookFail)
          window.alert(bookFail.error)
        }
      )
    }else{
      window.alert("Bạn chưa chọn ghế để thanh toán!")
    }
    
  }


  // ngOnChanges(changes:SimpleChange){
  //   this.soGheConTrong = this.gheArray?.length
  // }

  // datGheParent(thamso:any){
  //   // Tạo ra một object vé để gửi lên server
  //   let ve:{maGhe:string, giaVe:number} = {
  //     maGhe:thamso.Ghe.maGhe,
  //     giaVe:thamso.Ghe.giaVe
  //   }
  //   if(thamso.Status){
  //     this.soGheDaChon++;
  //     this.soGheConTrong--;
  //     this.MangGheDangChon.push(ve);
  //   }
  //   else{
  //     this.soGheDaChon--;
  //     this.soGheConTrong++;
  //     for(let index in this.MangGheDangChon){
  //       if(this.MangGheDangChon[index].maGhe == thamso.Ghe.maGhe){
  //         this.MangGheDangChon.splice(parseInt(index),1);
  //       }
  //     }
  //   }
  // }

}




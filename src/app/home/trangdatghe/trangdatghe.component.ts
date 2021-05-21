import { AfterViewInit, Component, DoCheck, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-trangdatghe',
  templateUrl: './trangdatghe.component.html',
  styleUrls: ['./trangdatghe.component.scss']
})
export class TrangdatgheComponent implements OnInit, OnChanges {
  @Input() gheArray?:any[] = [];

  soGheDaChon: number = 0;
  soGheConTrong?: number = this.gheArray?.length

  MangGheDangChon = [] as any;
  danhSachGheDaDat:any[] = [];


  constructor() { }

  ngOnInit(): void {
    console.log(this.gheArray)
    
  }

  ngOnChanges(){
    this.gheArray?.map( (ghe:any)=>{
      if(ghe.daDat){
        this.danhSachGheDaDat.push(ghe);
      }
    })

    this.soGheDaChon = this.danhSachGheDaDat.length;
    this.soGheConTrong = this.gheArray!.length - this.danhSachGheDaDat.length;
  }

  nhanStatusFromGheItem(statusDatGhe:any, gheObj:any){
    // console.log(statusDatGhe);
    // console.log(gheObj);
    if(statusDatGhe){
      this.soGheDaChon++;
      this.soGheConTrong!--;
      this.MangGheDangChon.push(gheObj);
    }else{
      this.soGheDaChon--;
      this.soGheConTrong!++;
      this.MangGheDangChon.map((item:any, index:number)=>{
        if(item.maGhe === gheObj.maGhe){
          this.MangGheDangChon.splice(index,1);
        }
      })
    }
    console.log(this.MangGheDangChon);
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

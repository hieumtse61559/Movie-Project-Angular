import { Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-trangdatghe',
  templateUrl: './trangdatghe.component.html',
  styleUrls: ['./trangdatghe.component.scss']
})
export class TrangdatgheComponent implements OnInit {
  @Input() gheArray?:any[] = [];

  soGheDaChon: number = 0;
  soGheConTrong?: number = this.gheArray?.length

  MangGheDangChon = [] as any;
  constructor() { }

  ngOnInit(): void {
    // console.log(this.gheArray)
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

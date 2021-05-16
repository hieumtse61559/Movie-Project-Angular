import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-ghe-item',
  templateUrl: './ghe-item.component.html',
  styleUrls: ['./ghe-item.component.scss']
})
export class GheItemComponent implements OnInit {
  status:boolean = false;
  @Output() emitStatus = new EventEmitter();
  @Input() itemGhe:any;
  constructor() { }

  ngOnInit(): void {
  }

  datGhe(){
    if(this.status){
      this.status = false;
    }
    else{
      this.status = true;
    }
    this.emitStatus.emit(this.status)
  }

}

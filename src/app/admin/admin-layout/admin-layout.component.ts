import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  toggle:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  handleToggleMenu(){
    console.log("aaaaaaaaaaaaaaaa")
    this.toggle = !this.toggle;
    console.log(this.toggle)
  }

}

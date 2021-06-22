import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  toggle:boolean = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  handleToggleMenu(){
    console.log("aaaaaaaaaaaaaaaa")
    this.toggle = !this.toggle;
    console.log(this.toggle)
  }

  adminLogout(){
    // Clear localStorage
    localStorage.clear();

    // Về lại trang home
    this.router.navigate(['/']);
  }
}

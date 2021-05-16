import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlyUsersComponent } from './quanly-users.component';

describe('QuanlyUsersComponent', () => {
  let component: QuanlyUsersComponent;
  let fixture: ComponentFixture<QuanlyUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuanlyUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanlyUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

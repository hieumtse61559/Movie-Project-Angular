import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrangdatgheComponent } from './trangdatghe.component';

describe('TrangdatgheComponent', () => {
  let component: TrangdatgheComponent;
  let fixture: ComponentFixture<TrangdatgheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrangdatgheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrangdatgheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

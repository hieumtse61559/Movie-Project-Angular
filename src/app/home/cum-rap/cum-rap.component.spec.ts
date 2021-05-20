import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CumRapComponent } from './cum-rap.component';

describe('CumRapComponent', () => {
  let component: CumRapComponent;
  let fixture: ComponentFixture<CumRapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CumRapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CumRapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

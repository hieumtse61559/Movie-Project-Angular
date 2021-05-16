import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransformService {
  // biến data này là một Observerble được tạo bởi BehaviorSubject nên sẽ có phường thức next(là gửi đi)
  private data= new BehaviorSubject(null);
  public asData = this.data.asObservable();
  constructor() { }
  public transformData(thamso:any){
    this.data.next(thamso)
  }
}

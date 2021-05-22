import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from './safe.pipe';
import { ShortCutPipe } from './short-cut.pipe';



@NgModule({
  declarations: [
    SafePipe,
    ShortCutPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    SafePipe, ShortCutPipe
  ]
})
export class PipeModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from './safe.pipe';
import { ShortCutPipe } from './short-cut.pipe';
import { FilterTablePipe } from './filter-table.pipe';



@NgModule({
  declarations: [
    SafePipe,
    ShortCutPipe,
    FilterTablePipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    FilterTablePipe,
    SafePipe, ShortCutPipe, 
  ]
})
export class PipeModule { }

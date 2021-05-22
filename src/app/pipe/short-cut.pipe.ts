import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortCut'
})
export class ShortCutPipe implements PipeTransform {

  transform(value: string, limit:number): string {
    if(value.length > limit){
      value = value.substr(0,limit) + "..."
    }
    return value;
  }

}

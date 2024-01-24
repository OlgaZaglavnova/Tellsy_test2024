import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'phone'
  })
  export class PhonePipe implements PipeTransform {
    transform(value: string): string {
      const phone1 = value.substring(0, value.length - 10);
      const phone2 = value.substring(2, value.length - 7);
      return `${phone1} ${phone2} xxx xx xx`;
    }
  }
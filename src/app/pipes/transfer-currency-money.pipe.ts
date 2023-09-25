import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transferCurrencyMoney'
})
export class TransferCurrencyMoneyPipe implements PipeTransform {

  transform(value: any): any {
    const roundedNumber = Math.ceil(value*1000)/1000;
    const formattedNumber = roundedNumber.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return formattedNumber;
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyConverter'
})
export class CurrencyConverterPipe implements PipeTransform {

  transform(valor:number, currencyCode: string = 'USD'): number {

    switch(currencyCode){
      
      case'USD':
        return valor;
      
      case'COP':
        return (valor * 4325);
  
      case'MXN':
        return (valor * 20.38);
      
      default:
        return valor;
    }
  }

}

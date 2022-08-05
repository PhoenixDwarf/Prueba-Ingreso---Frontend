import { Component, EventEmitter, Output } from '@angular/core';
import { Currency } from 'src/app/interfaces/interfaces.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Output() selectedCurrency:EventEmitter<string> =new EventEmitter();

  currencyOption:string='';

  currency:Currency[] = [
    {value: 'USD', viewValue: 'Dolares Americanos'},
    {value: 'COP', viewValue: 'Pesos Colombianos'},
    {value: 'MXN', viewValue: 'Pesos Mexicanos'},
  ];

  constructor() { }

  currencyChange(){
    this.selectedCurrency.emit(this.currencyOption);
  }

}

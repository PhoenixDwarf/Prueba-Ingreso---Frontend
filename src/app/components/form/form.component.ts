import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {


  origin = new FormControl('', [Validators.required, Validators.maxLength(3), Validators.minLength(3), Validators.pattern('^[a-zA-Z]*'), ]);
  destination = new FormControl('', [Validators.required, Validators.maxLength(3), Validators.minLength(3), Validators.pattern('^[a-zA-Z]*'), ]);

  originModel:string = '';
  destinationModel:string = '';

  constructor() { }

  ngOnInit(): void {
  }



  getErrorMessageOrigin() {
    if (this.origin.hasError('required')) {
      return 'Debes ingresar un origen';
    }
    if (this.origin.hasError('maxlength') || this.origin.hasError('minlength')) {
      return 'Debes ingresar únicamente tres letras';
    }
    if (this.origin.hasError('pattern')) {
      return 'Debes ingresar únicamente letras';
    }
    return '';
  }

  getErrorMessageDestination() {
    if (this.destination.hasError('required')) {
      return 'Debes ingresar un destino';
    }
    if (this.destination.hasError('maxlength') || this.destination.hasError('minlength')) {
      return 'Debes ingresar únicamente tres letras';
    }
    if (this.destination.hasError('pattern')) {
      return 'Debes ingresar únicamente letras';
    }
    return '';
  }

  submitForm(){

    //here goes the http call
  }

}

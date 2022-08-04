import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form:FormGroup = this.FormBuilder.group({
    origin: ['', [ Validators.required,  Validators.maxLength(3), Validators.minLength(3), Validators.pattern('^[a-zA-Z]*') ] ],
    destination: ['', [ Validators.required, Validators.maxLength(3), Validators.minLength(3), Validators.pattern('^[a-zA-Z]*') ] ]
  });

 

  originValue:string = '';
  destinationValue:string = '';

  constructor( private FormBuilder: FormBuilder) { }

  ngOnInit(): void {
    
  }



  getErrorMessageOrigin() {
    if (this.form.controls['origin'].hasError('required')) {
      return 'Debes ingresar un origen';
    }
    if (this.form.controls['origin'].hasError('maxlength') || this.form.controls['origin'].hasError('minlength')) {
      return 'Debes ingresar únicamente tres letras';
    }
    if (this.form.controls['origin'].hasError('pattern')) {
      return 'Debes ingresar únicamente letras';
    }
    return '';
  }

  getErrorMessageDestination() {
    if (this.form.controls['destination'].hasError('required')) {
      return 'Debes ingresar un destino';
    }
    if (this.form.controls['destination'].hasError('maxlength') || this.form.controls['destination'].hasError('minlength')) {
      return 'Debes ingresar únicamente tres letras';
    }
    if (this.form.controls['destination'].hasError('pattern')) {
      return 'Debes ingresar únicamente letras';
    }
    return '';
  }

  submitForm(){
    this.originValue = this.form.controls['origin'].value.toUpperCase()
    this.destinationValue = this.form.controls['destination'].value.toUpperCase()
    console.log(this.originValue,this.destinationValue);

    //Here goes the HTTP call
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Validators, FormGroup, FormBuilder} from '@angular/forms';
import { Flightrequest } from 'src/app/interfaces/interfaces.interface';
import { FlightService } from '../../services/flight.service';

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

  @Output() userRequest:EventEmitter<Flightrequest> =new EventEmitter();
  @Input() showSpinner:boolean = false;


  originValue:string = '';
  destinationValue:string = '';

  constructor( private FormBuilder: FormBuilder,
               private FlightService:FlightService) { }

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

    let request:Flightrequest = {
      origin: this.originValue,
      destination: this.destinationValue
    }
    this.userRequest.emit(request);
    this.FlightService.newRequest$.emit(request);

  }

}

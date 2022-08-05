import { Component } from '@angular/core';
import { ApiResponse, Flight, Flightrequest } from 'src/app/interfaces/interfaces.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PruebaTecnica';
  parentFlightData!: ApiResponse[];
  parentDataRequest!: Flightrequest;
}


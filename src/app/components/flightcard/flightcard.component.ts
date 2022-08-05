import { Component, Input, OnInit } from '@angular/core';
import { ApiResponse, Flight, Journey } from '../../interfaces/interfaces.interface';
import { Flightrequest } from 'src/app/interfaces/interfaces.interface';
import { FlightService } from '../../services/flight.service';

@Component({
  selector: 'app-flightcard',
  templateUrl: './flightcard.component.html',
  styleUrls: ['./flightcard.component.css']
})
export class FlightcardComponent implements OnInit {

  flightsData: ApiResponse[] = [];
  @Input() userRequestData!: Flightrequest;

  calculatedJourney1: Journey = {
    origin: '',
    destination: '',
    price: 0,
    flights: []
  }
  calculatedJourney2: Journey = {
    origin: '',
    destination: '',
    price: 0,
    flights: []
  }
  calculatedJourney3: Journey = {
    origin: '',
    destination: '',
    price: 0,
    flights: []
  }

  Journey1 = {
    Journey: this.calculatedJourney1
  };
  Journey2 = {
    Journey: this.calculatedJourney2
  };
  Journey3 = {
    Journey: this.calculatedJourney3
  };

  arrayFirstStops: ApiResponse[] = [];
  arraySecondStops: ApiResponse[] = []; //PENDING
  isDirectFlight: boolean = false;

  flightOptions: number = 1;

  constructor(private FlightService: FlightService) { }

  ngOnInit(): void {
    this.FlightService.getFlights2().subscribe({
      next: (res) => {
        this.flightsData = res;
        console.log(this.flightsData);
      }
    });

    this.FlightService.newRequest$.subscribe(request => {
      //reseting porperties
      this.resetProperties();
      //setupOriginAndDestination
      this.receiveOriginAndDestination(request);
      //checkIfIsDirectFlight
      this.directFlight(request);
      //IndirectFlights
      this.indirectFlightTwoStops(request);
      this.indirectFlightThreeStops(request);
    });
  }


  resetProperties(){
    this.flightOptions = 1;
      this.isDirectFlight = false;

      this.calculatedJourney1 = {
        origin: '',
        destination: '',
        price: 0,
        flights: []
      }
      this.calculatedJourney2 = {
        origin: '',
        destination: '',
        price: 0,
        flights: []
      }
      this.calculatedJourney3 = {
        origin: '',
        destination: '',
        price: 0,
        flights: []
      }

      this.Journey1 = {
        Journey: this.calculatedJourney1
      }
      this.Journey2 = {
        Journey: this.calculatedJourney2
      }
      this.Journey3 = {
        Journey: this.calculatedJourney3
      }

      this.arrayFirstStops = [];
      this.arraySecondStops = [];
  }


  receiveOriginAndDestination(request:Flightrequest){
      this.calculatedJourney1.origin = request.origin;
      this.calculatedJourney1.destination = request.destination;
      this.calculatedJourney2.origin = request.origin;
      this.calculatedJourney2.destination = request.destination;
      this.calculatedJourney3.origin = request.origin;
      this.calculatedJourney3.destination = request.destination;
  }

  directFlight(request:Flightrequest){
    this.flightsData.map((flights) => {
      if ((flights.departureStation == request.origin) && (flights.arrivalStation == request.destination)) {
        let flight: Flight = {
          origin: flights.departureStation,
          destination: flights.arrivalStation,
          price: flights.price,
          transport: { flightCarrier: flights.flightCarrier, flightNumber: flights.flightNumber },
        }
        this.calculatedJourney1.flights.push(flight);
        this.calculatedJourney1.price = flight.price;
        this.isDirectFlight = true;
      }
      if (flights.departureStation == request.origin) {
        this.arrayFirstStops.push(flights);
      }
    });
  }

  indirectFlightTwoStops(request:Flightrequest){
    if (this.isDirectFlight == false) {
      this.arrayFirstStops.map((origins) => {
        this.flightsData.map((res) => {
          if (res.departureStation == origins.arrivalStation) {
            if (res.arrivalStation == request.destination) {

              if (this.flightOptions == 1) {
                let flight1: Flight = {
                  origin: origins.departureStation,
                  destination: origins.arrivalStation,
                  price: origins.price,
                  transport: { flightCarrier: origins.flightCarrier, flightNumber: origins.flightNumber },
                }

                let flight2: Flight = {
                  origin: res.departureStation,
                  destination: res.arrivalStation,
                  price: res.price,
                  transport: { flightCarrier: res.flightCarrier, flightNumber: res.flightNumber },
                }

                this.calculatedJourney1.flights.push(flight1, flight2);
                this.calculatedJourney1.price = flight1.price + flight2.price;
                this.flightOptions += 1;
              }
              else if (this.flightOptions == 2) {
                let flight1: Flight = {
                  origin: origins.departureStation,
                  destination: origins.arrivalStation,
                  price: origins.price,
                  transport: { flightCarrier: origins.flightCarrier, flightNumber: origins.flightNumber },
                }

                let flight2: Flight = {
                  origin: res.departureStation,
                  destination: res.arrivalStation,
                  price: res.price,
                  transport: { flightCarrier: res.flightCarrier, flightNumber: res.flightNumber },
                }

                this.calculatedJourney2.flights.push(flight1, flight2);
                this.calculatedJourney2.price = flight1.price + flight2.price;
                this.flightOptions += 1;
              }
              else if(this.flightOptions == 3){
                let flight1: Flight = {
                  origin: origins.departureStation,
                  destination: origins.arrivalStation,
                  price: origins.price,
                  transport: { flightCarrier: origins.flightCarrier, flightNumber: origins.flightNumber },
                }

                let flight2: Flight = {
                  origin: res.departureStation,
                  destination: res.arrivalStation,
                  price: res.price,
                  transport: { flightCarrier: res.flightCarrier, flightNumber: res.flightNumber },
                }

                this.calculatedJourney3.flights.push(flight1, flight2);
                this.calculatedJourney3.price = flight1.price + flight2.price;
                this.flightOptions += 1;
              }
            }
            else{
              this.arraySecondStops.push(res);
            }
          }
        });
      });
    }
  }

  indirectFlightThreeStops(request:Flightrequest){
    let flight1: Flight;
    if(this.isDirectFlight == false){
      this.arraySecondStops.map((origins) => {
        this.flightsData.map((res) => {
          if (res.departureStation == origins.arrivalStation){
            if(res.arrivalStation == request.destination){
              this.arrayFirstStops.map((firststop) =>{
                if ((firststop.departureStation == request.origin) && (firststop.arrivalStation == origins.departureStation)){
                    flight1 = {
                    origin: firststop.departureStation,
                    destination: firststop.arrivalStation,
                    price: firststop.price,
                    transport: { flightCarrier: firststop.flightCarrier, flightNumber: firststop.flightNumber },
                  }
                }
              });
              if (this.flightOptions == 1) {

                let flight2: Flight = {
                  origin: origins.departureStation,
                  destination: origins.arrivalStation,
                  price: origins.price,
                  transport: { flightCarrier: origins.flightCarrier, flightNumber: origins.flightNumber },
                }

                let flight3: Flight = {
                  origin: res.departureStation,
                  destination: res.arrivalStation,
                  price: res.price,
                  transport: { flightCarrier: res.flightCarrier, flightNumber: res.flightNumber },
                }

                this.calculatedJourney1.flights.push(flight1, flight2, flight3);
                this.calculatedJourney1.price = flight1.price + flight2.price + flight3.price;
                this.flightOptions += 1;
              }
              else if (this.flightOptions == 2){
                let flight2: Flight = {
                  origin: origins.departureStation,
                  destination: origins.arrivalStation,
                  price: origins.price,
                  transport: { flightCarrier: origins.flightCarrier, flightNumber: origins.flightNumber },
                }

                let flight3: Flight = {
                  origin: res.departureStation,
                  destination: res.arrivalStation,
                  price: res.price,
                  transport: { flightCarrier: res.flightCarrier, flightNumber: res.flightNumber },
                }

                this.calculatedJourney2.flights.push(flight1, flight2, flight3);
                this.calculatedJourney2.price = flight1.price + flight2.price + flight3.price;
                this.flightOptions += 1;
              }
              else{
                let flight2: Flight = {
                  origin: origins.departureStation,
                  destination: origins.arrivalStation,
                  price: origins.price,
                  transport: { flightCarrier: origins.flightCarrier, flightNumber: origins.flightNumber },
                }

                let flight3: Flight = {
                  origin: res.departureStation,
                  destination: res.arrivalStation,
                  price: res.price,
                  transport: { flightCarrier: res.flightCarrier, flightNumber: res.flightNumber },
                }

                this.calculatedJourney3.flights.push(flight1, flight2, flight3);
                this.calculatedJourney3.price = flight1.price + flight2.price + flight3.price;
              }

            }
          }
        } );
      });
    }

  }


}

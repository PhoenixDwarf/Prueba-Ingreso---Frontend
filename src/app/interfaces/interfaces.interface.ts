//interfaces from UML design

export interface Transport{
    flightCarrier:   string;
    flightNumber:    string;
}

export interface Flight{
    transport:       Transport;
    origin:          string;
    destination:     string;
    price:           number;
}

export interface Journey{
    flights:         Flight[];
    origin:          string;
    destination:     string;
    price:           number;
}

export interface Flightrequest{
    origin: string;
    destination: string;
}

// Mapping api response

export interface ApiResponse {
    departureStation: string;
    arrivalStation:   string;
    flightCarrier:    FlightCarrier;
    flightNumber:     string;
    price:            number;
}

export enum FlightCarrier {
    Co = "CO",
}

//Currency

export interface Currency {
    value:      string;
    viewValue:  string;
}
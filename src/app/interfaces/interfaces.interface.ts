
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

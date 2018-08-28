import { Component, OnInit } from '@angular/core';
import { FlightService } from '../../services/flight.service';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

	private _loading: boolean;
	private vuelos: any[];

	constructor(
		private flightProv: FlightService
	) { }

	ngOnInit() {
		this._loading = true; 

		this.flightProv.getFlights().subscribe(resp => {
			if(resp.status){
				this.vuelos = resp.data[0];
			}else{
				//Message with error
			}

			this._loading = false;
		});

	}
}

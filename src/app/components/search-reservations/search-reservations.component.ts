import { Component, OnInit } from '@angular/core';
import { FlightService } from '../../services/flight.service';

@Component({
	selector: 'app-search-reservations',
	templateUrl: './search-reservations.component.html',
	styleUrls: ['./search-reservations.component.scss']
})
export class SearchReservationsComponent implements OnInit {

	private _loading: boolean;
	private documento: string;

	private vuelos: any[];

	constructor(
		private flightsProv: FlightService
	) { }

	ngOnInit() {
		this._loading = false;
	}

	public getReservas(){
		this._loading = true;

		this.flightsProv.getReservas(this.documento).subscribe(response => {
			if(response.status){
				this.vuelos = response.data[0];
			}else{
				//Message with error
			}

			this._loading = false;
		});
	}

}

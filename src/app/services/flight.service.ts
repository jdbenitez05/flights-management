import { Injectable, Pipe } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
// import { of } from 'rxjs';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/do';
// import { map, filter, catchError, mergeMap } from 'rxjs/operators';
// import { pipe } from '@angular/core/src/render3/pipe';

import { Observable, of, throwError } from "rxjs"
import { map, catchError } from "rxjs/operators"

@Injectable({
	providedIn: 'root'
})
export class FlightService {
	public _flights: any[];


	constructor(
		private http: Http
	) { }


	getFlights() {
		return this.http.get("http://localhost:3000/api/getFlights").pipe(
			map((response: any) => {
				let resp = response.json();

				if (resp.status)
					this._flights = resp.data[0];

				return resp;
			}), catchError(error => {
				return throwError('Something went wrong!')
			})
		)
	}

	getFlight(idvuelo: number) {
		let vuelo = this._flights.filter(x => x.vueloid = idvuelo)[0];

		return vuelo;
	}

	getClient(documento: string) {
		return this.http.get("http://localhost:3000/api/getClient/" + documento).pipe(map((response: any) => {
			let resp = response.json();

			return resp;
		}), catchError(error => {
			return throwError('Error consultando cliente: ' + error)
		}));
	}


	putReservation(cliente: any, vueloid: number, clientid: number, asientos: number) {
		let body = cliente;
		body.idvuelo = vueloid;
		body.idcliente = clientid;
		body.asientos = asientos;

		return this.http.post("http://localhost:3000/api/postReservation/", body).pipe(map((response: any) => {
			let resp = response.json();

			return resp;
		}), catchError(error => {
			return throwError('Error realizando reserva: ' + error)
		}));

	}


	public getReservas(documento: string) {
		return this.http.get("http://localhost:3000/api/getReservas/" + documento).pipe(map((response: any) => {
			// let resp = response.json();

			// return resp;
			let resp = response.json();

			// if (resp.status)
			// 	this._flights = resp.data[0];

			return resp;
		}), catchError(error => {
			return throwError('Error consultando reservas: ' + error)
		}));
	}
}

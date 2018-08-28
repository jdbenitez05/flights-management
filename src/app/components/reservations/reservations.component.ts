import { Component, OnInit } from '@angular/core';
import { FlightService } from '../../services/flight.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
	selector: 'app-reservations',
	templateUrl: './reservations.component.html',
	styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {

	private vueloid: number;
	private vuelo: any;

	private _loadingCli: boolean;
	private _loadingReserva: boolean;
	private documento: string;

	private cliente: client;
	public formReservation: FormGroup;
	public viewCliente: boolean;


	constructor(
		private _router: Router,
		private _activatedRoute: ActivatedRoute,
		private flightProv: FlightService
	) { }

	ngOnInit() {
		this.viewCliente = false;
		this._loadingCli = false;
		this._loadingReserva = false;

		this.documento = '';
		document.querySelector('body').style.overflow = 'hidden';

		this.vueloid = this._activatedRoute.snapshot.params.id;
		this.vuelo = this.flightProv.getFlight(this.vueloid);

		this.cliente = new client();

		this.loadForm();
	}

	public cancelar() {
		this._router.navigate(
			[
				{
					outlets: {
						modal: null
					}
				}
			],
			{
				relativeTo: this._activatedRoute.parent // <--- PARENT activated route.
			}
		);

		document.querySelector('body').style.overflow = 'auto';
	}

	public completeForm(){
		if(this.documento.length > 5){
			let doc = this.documento.trim();
			this._loadingCli = true;
			this.flightProv.getClient(doc).subscribe(resp => {
				if(resp.status){
					let clients = resp.data[0];

					if(clients.length){
						this.loadCliente(clients[0]);
					}else{
						this.cliente = new client();
						//Cliente no registrado
					}

					this.viewCliente = true;
				}else{
					//Message with error
				}

				console.log('completeForm(): resp: ', resp);
	
				this._loadingCli = false;
			});

		}else{
			//Mensaje Por favor ingrese un documento valido
		}
	}

	public loadCliente(objCliente: any){
		this.cliente = objCliente;

		let fecha = moment(this.cliente.fecha_nacimiento).format('YYYY-MM-DD');

		console.log('fecha: ', fecha);

		this.formReservation.controls.nombres.setValue(this.cliente.nombres);
		this.formReservation.controls.apellidos.setValue(this.cliente.apellidos);
		this.formReservation.controls.correo.setValue(this.cliente.correo);
		this.formReservation.controls.telefono.setValue(this.cliente.telefono);
		this.formReservation.controls.fechanacimiento.setValue(fecha);
	}

	public reservar(){
		if(this.formReservation.valid){
			let body = this.formReservation.value;
			body.documento = this.documento;
			this._loadingReserva = true;
			this.flightProv.putReservation(body, this.vueloid, this.cliente.idcliente, body.asientos).subscribe(response => {
				console.log(response);
				this._loadingReserva = false;

				//Mensaje de reserva Realizada con exito
				alert('Reserva realizada con exito');
				// Close modal
				this.cancelar();
			});
		}else{
			//Mensaje Por favor complete el formulario 
		}
	}

	public loadForm(){
		this.formReservation = new FormGroup({
			nombres: new FormControl(this.cliente.nombres, [
				Validators.required,
				// Validators.pattern(RegexUtils._rxEmail)
			]),
			apellidos: new FormControl(this.cliente.apellidos, [
				Validators.required,
				// Validators.pattern(RegexUtils._rxEmail)
			]),
			fechanacimiento: new FormControl(this.cliente.fecha_nacimiento, [
				Validators.required,
				// Validators.pattern(RegexUtils._rxEmail)
			]),
			correo: new FormControl(this.cliente.correo, [
				Validators.required,
				// Validators.pattern(RegexUtils._rxEmail)
			]),
			telefono: new FormControl(this.cliente.telefono, [
				Validators.minLength(3),
				Validators.maxLength(15),
				Validators.required
			]),
			asientos: new FormControl(this.cliente.telefono, [
				Validators.required
			])
		});
	}
}


export class client{
	public idcliente: number;
	public nombres: string;
	public apellidos: string;
	public documento: string;
	public fecha_nacimiento: Date;
	public correo: string;
	public telefono: string;

	constructor(){
		this.idcliente = null;
		this.nombres = '';
		this.apellidos = '';
		this.documento = '';
		this.fecha_nacimiento = null;
	}
}
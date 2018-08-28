import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { FlightService } from './services/flight.service';
import { HttpModule } from '@angular/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		SearchComponent,
		ReservationsComponent
	],
	imports: [
		BrowserModule,
		HttpModule,
		FormsModule,
		ReactiveFormsModule,
		AppRoutingModule
	],
	providers: [FlightService],
	bootstrap: [AppComponent]
})
export class AppModule { }

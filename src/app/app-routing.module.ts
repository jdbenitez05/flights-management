import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { SearchComponent } from './components/search/search.component';
import { SearchReservationsComponent } from './components/search-reservations/search-reservations.component';
// import { LoginComponent } from './main/login/login.component';

const routes: Routes = [
    // { path: '', redirectTo: '/login', pathMatch: 'full' },
    // // { path: 'login', component: LoginComponent },
    // {
	// 	path: 'admin',
	// 	// loadChildren: './app/admin/admin.module#AdminModule'
	// 	loadChildren: './admin/admin.module#AdminModule'
    // }
    {
        path: '',
        component: SearchComponent
    },
    {
        path: 'reservas',
        component: SearchReservationsComponent
    },
    {
        path: 'reserve/:id',
        component: ReservationsComponent,
        outlet: 'modal'
    }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
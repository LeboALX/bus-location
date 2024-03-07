import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
import { AddVehicleComponent } from './components/add-vehicle/add-vehicle.component';
import { AddDriverComponent } from './components/add-driver/add-driver.component';
import { AddTripComponent } from './components/add-trip/add-trip.component';
import { CompanyDashboardComponent } from './components/company-dashboard/company-dashboard.component';
=======
import { LoginComponent } from './popups/login/login.component';
import { AddBusesComponent } from './popups/add-buses/add-buses.component';
>>>>>>> 83d5d3221eec246c0ecdf728fb855aa69c62e3fe

const routes: Routes = [
  { path: '', redirectTo: '/company-dashboard', pathMatch: 'full' }, // redirect to `sign-in`
  { path: 'company-dashboard', component: CompanyDashboardComponent ,children: [
    {path: 'add-vehicle', component: AddVehicleComponent},
    {path: 'add-driver', component: AddDriverComponent},
    {path: 'add-trip', component: AddTripComponent}
  ]}
  // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

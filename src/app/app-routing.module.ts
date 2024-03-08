import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { SuperAdminComponent } from './components/super-admin/super-admin.component';
import { CompanyDashboardComponent } from './components/company-dashboard/company-dashboard.component';
import { AddBusesComponent } from './popups/add-buses/add-buses.component';
import { AddRouteComponent } from './popups/add-route/add-route.component';
import { AddDriverComponent } from './components/add-driver/add-driver.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent, },
  { path: 'super-admin', component: SuperAdminComponent },
  {
    path: 'company-dashboard', component: CompanyDashboardComponent, children: [
      { path: 'add-bus', component: AddBusesComponent },
      { path: 'add-route', component: AddRouteComponent },
      { path: 'add-driver', component: AddDriverComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './popups/login/login.component';
import { SuperAdminComponent } from './components/super-admin/super-admin.component';
<<<<<<< HEAD
import { TrackerComponent } from './components/tracker/tracker.component'
import { GoogleMapsModule } from '@angular/google-maps';

=======
import { AddVehicleComponent } from './components/add-vehicle/add-vehicle.component';
import { AddDriverComponent } from './components/add-driver/add-driver.component';
import { AddTripComponent } from './components/add-trip/add-trip.component'
import { CompanyDashboardComponent } from './components/company-dashboard/company-dashboard.component';
import { NgChartsModule } from 'ng2-charts';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { AddRouteComponent } from './popups/add-route/add-route.component';
import { AddBusesComponent } from './popups/add-buses/add-buses.component';
import { RegisterComponent } from './popups/register/register.component';
>>>>>>> ef2e2e0b68233b18d38ab8d768f7708837b94c7d

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    SuperAdminComponent,
<<<<<<< HEAD
    TrackerComponent,
=======
    CompanyDashboardComponent,
    AddVehicleComponent,
    AddTripComponent,
    AddBusesComponent,
    RegisterComponent,
    AddDriverComponent,
    PieChartComponent,
    LineChartComponent,
    AddRouteComponent,
      
>>>>>>> ef2e2e0b68233b18d38ab8d768f7708837b94c7d
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
<<<<<<< HEAD
    GoogleMapsModule
=======
    FormsModule,
    NgChartsModule,
>>>>>>> ef2e2e0b68233b18d38ab8d768f7708837b94c7d
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

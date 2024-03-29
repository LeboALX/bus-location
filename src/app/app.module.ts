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
import { TrackerComponent } from './components/tracker/tracker.component'
import { GoogleMapsModule } from '@angular/google-maps';
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
import { HttpClientModule } from '@angular/common/http';
import { ActionTabComponent } from './popups/action-tab/action-tab.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    SuperAdminComponent,
    PieChartComponent,
    LineChartComponent,
    TrackerComponent,
    CompanyDashboardComponent,
    AddVehicleComponent,
    AddTripComponent,
    AddBusesComponent,
    RegisterComponent,
    AddDriverComponent,
    RegisterComponent,
    AddRouteComponent,
    ActionTabComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    FormsModule,
    NgChartsModule,
    HttpClientModule
  ],
  providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }

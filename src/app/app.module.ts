import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './popups/login/login.component';
import { SuperAdminComponent } from './components/super-admin/super-admin.component';
<<<<<<< HEAD
import { NgChartsModule } from 'ng2-charts';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { AddRouteComponent } from './popups/add-route/add-route.component';
=======
import { AddBusesComponent } from './popups/add-buses/add-buses.component';
import { RegisterComponent } from './popups/register/register.component';
import { AddDriverComponent } from './popups/add-driver/add-driver.component'
>>>>>>> c14f8732762f12722f72569aa10183dac50ebb90

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    SuperAdminComponent,
<<<<<<< HEAD
    PieChartComponent,
    LineChartComponent,
    AddRouteComponent,
   
=======
    AddBusesComponent
   
    RegisterComponent,
    AddDriverComponent
>>>>>>> c14f8732762f12722f72569aa10183dac50ebb90
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    NgChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

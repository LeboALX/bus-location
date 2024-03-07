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
import { TrackerComponent } from './components/tracker/tracker.component'
import { GoogleMapsModule } from '@angular/google-maps';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    SuperAdminComponent,
    TrackerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    GoogleMapsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

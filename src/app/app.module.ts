import { WebcamModule } from 'ngx-webcam';
import { HomeComponent } from './pages/home/home.component';
import { SupervisorComponent } from './pages/supervisor/supervisor.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AlumnoComponent } from './pages/alumno/alumno.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SupervisorComponent,
    HomeComponent,
    AlumnoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forChild([]),
    HttpClientModule,
    FormsModule,
    WebcamModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

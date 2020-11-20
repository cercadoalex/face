import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { AlumnoService } from 'src/app/core/alumno.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // private _hubConnection: HubConnection;
  message = '';

  messages: string[] = [];

  username: any;
  constructor(private router: Router, private alumnoService: AlumnoService) { }

  ngOnInit(): void {
       // this._hubConnection =


       /* this._hubConnection.on('Send', (data: any) => {
        const received = `Received: ${data}`;
        this.messages.push(received);
    });*/


  }

  public sendMessage(): void {
   console.log('hola mundo');
  }

  login(){
    this.alumnoService.GetLoginAlumno(this.username).subscribe(response => {

      console.log(response);
      if (!response.error) {
        const nombres = response.data.nombre + ' ' + response.data.apellido;
        sessionStorage.setItem('user', nombres );
        sessionStorage.setItem('userid',  response.data.codigo);

        this.router.navigate(['/home']);
      } else {

      }
    });
    // this.router.navigate(['/home']);
  }


  supervisor(){
    this.router.navigate(['/supervisor']);
  }
  mantalumno(){
    this.router.navigate(['/alumno']);
  }





}

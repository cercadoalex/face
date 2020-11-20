import { Component, OnInit } from '@angular/core';
import { FileImageService } from 'src/app/core/file-image.service';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.css']
})
export class SupervisorComponent implements OnInit {

  private _hubConnection: HubConnection;
  message = '';

  messages: string[] = [];

  isconfidence: any;
  ///

  listAlert: Array<any> = [];
  isloading = false;
  isInfo = false;
  FotosOriginales: Array<any> = [];
  FotosTrucadas: Array<any> = [];
  Informacion;
  selectedImg: any;

 constructor(
  private _fileImageService: FileImageService,
  private router: Router
) { }

  ngOnInit(): void {
    this.GetAlerta();

    this._hubConnection =
    new HubConnectionBuilder().withUrl(`${environment.BASE_API}/chathub`)
    .withAutomaticReconnect()
    .build();


    /*this._hubConnection.on('Recarga', (data: any) => {
    const received = `Received: ${data}`;
    this.messages.push(received);
    });*/
    this._hubConnection.on('Recargar', () => {
      this.sendMessage();
    });







    this._hubConnection.start()
    .then(() => {
        // console.log('Hub connection started');
    })
    .catch(err => {
        // console.log('Error while establishing connection');
    });
  }


  public sendMessage(): void {
   // console.log('hub signalR Ingreso debe cargar alerta');
    this.GetAlerta();

  }


 public GetAlerta(): void{
    this._fileImageService.GetAlert().subscribe(response => {
      this.listAlert = response.data;
      // .log(this.listAlert);
    });

  }


  onSelect(item){
    this.isconfidence = item.confidence;
    this.selectedImg = `${environment.BASE_API + item.fileCapture}` ;
    this.isloading = true;
    this.FotosTrucadas = [];
    this.FotosOriginales = [];

    this._fileImageService.GetInformacionAlumno(item.alumno.codigo).subscribe(response => {
       response.data.fotoOrininals.forEach(obj => {
         this.FotosOriginales.push(`${environment.BASE_API + obj.fileFullPath}`);
       });

       /*response.data.imageUrl.forEach(element => {
        console.log('FotosTrucadas', element);
        this.FotosTrucadas.push(`${environment.BASE_API + element}`);
      });*/
       this.Informacion = response.data.alumno;


      /// this.selectedImg = this.FotosTrucadas[0];
      // console.log(response.data.alumno);
       this.isInfo = true;
       this.isloading = false;

      // this.FotosTrucadas = response.data.fotoOrininals;
    });


  }

  supervisor(): void{
    this.router.navigate(['/supervisor']);

  }
  alumno(): void{
    this.router.navigate(['/alumno']);

  }

  compare(): void{
    this.router.navigate(['/compare']);

  }

}

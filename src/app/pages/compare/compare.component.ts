import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { FileImageService } from 'src/app/core/file-image.service';
import { Alummno } from 'src/app/models/Alumno';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {
  username: any;
  userid: any;
  imgUrl: any;
  imgOriginals: [];
  selectedImg: any;

  datacapture: any;
  datafaceinfo: any;
  FotosOriginales: Array<any> = [];
  Informacion;
  borderstyle: any;
  confianza: any;
  foto = false;

  codigoBuscar: any = 'C-000102030';

  public showWebcam = true;
 public multipleWebcamsAvailable = false;
 public deviceId: string;
 public videoOptions: MediaTrackConstraints = {
    width: {ideal: 340},
    height: {ideal: 400}
 };
 public errors: WebcamInitError[] = [];
 // latest snapshot
 public webcamImage: WebcamImage = null;
 // webcam snapshot trigger
 private trigger: Subject<void> = new Subject<void>();
 constructor(
  private _fileImageService: FileImageService,
  private router: Router
) { }
  public ngOnInit(): void {

    this.username = sessionStorage.getItem('user');
    this.userid = sessionStorage.getItem('userid');


    WebcamUtil.getAvailableVideoInputs()
     .then((mediaDevices: MediaDeviceInfo[]) => {
       this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
     });
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }
  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }
 public handleImage(webcamImage: WebcamImage): void {
  this.webcamImage = webcamImage;

  const data = new Alummno();
  data.base64 = webcamImage.imageAsDataUrl.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
  data.codigoAlummno = this.userid;

  this._fileImageService.CreateCompare(data).subscribe(respuesta => {
    this.datacapture = respuesta;
    if (!this.datacapture.error) {
      this.foto = true;
      this.userid = sessionStorage.getItem('userid');

      // this.InformacionOriginales(this.userid);
      this.selectedImg = `${environment.BASE_API + this.datacapture.path}`;
      this.datafaceinfo = this.datacapture.data.message;
      sessionStorage.setItem('code', this.datacapture.data.faceId );

    }



  });



}


InformacionOriginales(item){
 // this.isloading = true;
  this.FotosOriginales = [];
  this._fileImageService.GetInformacionAlumno(item).subscribe(response => {
     response.data.fotoOrininals.forEach(obj => {
       const info = {url :  obj.fileFullPath , FullPath: `${environment.BASE_API + obj.fileFullPath}` };

       this.FotosOriginales.push(info);
     });



  });


}

selectOriginal(item){
  // this.borderstyle = 'img-select';
  const codeimg = sessionStorage.getItem('code');
  this.userid = sessionStorage.getItem('userid');

  console.log('OK', this.codigoBuscar, codeimg, item.url);

  this._fileImageService.CompareAzureImage(this.codigoBuscar, codeimg, item.url).subscribe(response => {


    this.confianza = response.confianza;


 });


}

selectimgtest(){
  this.borderstyle = 'img-select';
}


public get triggerObservable(): Observable<void> {
  return this.trigger.asObservable();
}


onBuscarAlumno(parametro: string): void {
  sessionStorage.setItem('userid',  parametro);
  this.InformacionOriginales(parametro);


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

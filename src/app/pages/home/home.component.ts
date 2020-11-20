import { Component, OnInit } from '@angular/core';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {Subject, Observable, interval} from 'rxjs';
import { FileImageService } from 'src/app/core/file-image.service';
import { Alummno } from 'src/app/models/Alumno';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username: any;
  userid: any;

  imgUrl: any;
  imgOriginals: [];
 // toggle webcam on/off
 public showWebcam = true;
 public multipleWebcamsAvailable = false;
 public deviceId: string;
 public videoOptions: MediaTrackConstraints = {
    width: {ideal: 424},
    height: {ideal: 476}
 };
 public errors: WebcamInitError[] = [];
 // latest snapshot
 public webcamImage: WebcamImage = null;
 // webcam snapshot trigger
 private trigger: Subject<void> = new Subject<void>();


 constructor(
  private _fileImageService: FileImageService,
) { }

 public ngOnInit(): void {
  this.username = sessionStorage.getItem('user');
  this.userid = sessionStorage.getItem('userid');

  WebcamUtil.getAvailableVideoInputs()
     .then((mediaDevices: MediaDeviceInfo[]) => {
       this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
     });

     // 60 * 1000
  const contador = interval(1000);
  contador.subscribe(() => {

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
   // console.log('base64', webcamImage.imageAsDataUrl);

   const form = new FormData();
   form.append('base64', webcamImage.imageAsDataUrl);
   form.append('codigoAlummno', this.username);

   const data = new Alummno();
   data.base64 = webcamImage.imageAsDataUrl.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
   data.codigoAlummno = this.userid;




   this._fileImageService.Create(data).subscribe(response => {

    // console.log(response);

   });



 }



 public get triggerObservable(): Observable<void> {
   return this.trigger.asObservable();
 }

 clickServiceGet(){

  this._fileImageService.GetAlert().subscribe(response => {

    this.imgUrl = response.data.fileFullPath;
    this.imgOriginals = response.data.fotoOrininals;

   // console.log(this.imgOriginals);

   });
 }

}

import { environment } from './../../../environments/environment.prod';
import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlumnoService } from 'src/app/core/alumno.service';
import { AlummnoResponse } from 'src/app/models/AlumnoResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {
  fileToUpload: File = null;
  selectedFiles: FileList;
  myFiles: string[] = [];

  deleteAll = false;
  /// para
  Informacion: any;
  codigoBuscar: any = 'C-000102030';
  FotosOriginales: Array<any> = [];


  // alumno
  codigo: string;
  nombre: string;
  apellido: string;


  constructor( private router: Router, private uploadService: AlumnoService) { }

  ngOnInit(): void {
    this.Informacion = new AlummnoResponse();
    this.Informacion.nombre = '';
    this.Informacion.apellido = '';
    this.Informacion.codigo = '';
    this.Informacion.images = '';

  }

  /* handleFileInput(event) {
     const file = event.target.files;
     for (let i = 0; i < file.length; i++) {
       const reader = new FileReader();
       reader.readAsDataURL(file[i]);
       reader.onload = () => {
         console.log('Convertir', reader.result);
     };
     }
   }*/

  selectFiles(event) {
    this.myFiles = [];
    // this.selectedFiles = event.target.files;
    for (let i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
    }
    console.log('myFiles', this.myFiles);

  }

  uploadFiles() {
    const formData = new FormData();
    formData.append('codigo', this.codigo);
    formData.append('nombre', this.nombre);
    formData.append('apellido', this.apellido);

    for (let i = 0; i < this.myFiles.length; i++) {
      formData.append('images', this.myFiles[i]);
    }
    console.log('formData', formData);
    this.upload(formData);

  }
  upload(file) {
    console.log('Archivos', file);

    this.uploadService.upload(file).subscribe(
      event => {
        console.log('ingreso', file);
        if (!event.error) {
          this.onBuscarAlumno(this.codigo);
          this.Limpiar();

        } else {

        }



        // this.onBuscarAlumno(this.codigo);

      },
      err => {
        console.error('Error');

      });
  }


  onBuscarAlumno(parametro: string): void {
    this.FotosOriginales = [];

    this.uploadService.GetInformacionAlumno(parametro).subscribe(response => {
      if (!response.error) {
        console.log('cantidad originales', response.data.fotoOrininals.length);

        if (response.data.fotoOrininals.length > 0) {
          this.deleteAll = true;
          response.data.fotoOrininals.forEach(obj => {
            this.FotosOriginales.push(`${environment.BASE_API + obj.fileFullPath}`);
          });
        } else {
          alert('ALUMNO NO CUENTA CON IMAGENES');
          // this.Limpiar();
          this.deleteAll = false;
        }
        this.Informacion = new AlummnoResponse();
        this.Informacion = response.data.alumno;
        this.codigo = this.Informacion.codigo;
        this.nombre = this.Informacion.nombre;
        this.apellido = this.Informacion.apellido;

      } else {
        alert('ALUMNO NO REGISTRADO');
        this.Limpiar();
        this.deleteAll = false;

      }



    });

  }
  EliminarImagen(item): void {
    console.log('eliminar', item.replace(`${environment.BASE_API}`, ''));


    this.uploadService
      .EliminarByImagen(
        this.codigoBuscar,
        item.replace(`${environment.BASE_API}`, ''), false).subscribe(response => {

          if (!response.error) {
            this.onBuscarAlumno(this.codigoBuscar);
          }

        });


  }
  EliminarByAllImagen(): void {
    this.uploadService
      .EliminarByImagen(
        this.codigoBuscar,
        '/xxx/xxx/xxx.jpg', true).subscribe(response => {

          if (!response.error) {
            this.onBuscarAlumno(this.codigoBuscar);
          }

        });
  }
  Limpiar(): void {
    this.Informacion = new AlummnoResponse();
    this.Informacion.nombre = '';
    this.Informacion.apellido = '';
    this.Informacion.codigo = '';
    this.Informacion.images = '';
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

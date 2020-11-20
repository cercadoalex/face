import { environment } from 'src/environments/environment';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Alummno } from '../models/Alumno';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  protected readonly apiUrl = environment.BASE_API;

  constructor(private http: HttpClient) { }

  upload(file: any) {
    const url = `${this.apiUrl}/api/Alumno/Create`;
    console.log('URL', url);
    return this.http.post<any>(url, file);
  }


 /* upload(file: any): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${this.apiUrl}/api/Alumno/Create`, file, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }*/
  GetLoginAlumno(codigo: string): Observable<any> {
    const url = `${this.apiUrl}/api/Alumno/GetLoginAlumno/${codigo}`;
   // const headers = new HttpHeaders().set('Authorization', `Bearer ${this.TOKEN}`);
    return this.http.get(url);
  }



  GetInformacionAlumno(codigo: string): Observable<any> {
    const url = `${this.apiUrl}/api/Alumno/GetInformacionAlumno/${codigo}`;
   // const headers = new HttpHeaders().set('Authorization', `Bearer ${this.TOKEN}`);
    return this.http.get(url);
  }


  EliminarByImagen(codigo: string, file: string, byall: boolean): Observable<any> {
    const url = `${this.apiUrl}/api/Alumno/EliminarByImagen?codigoalumno=${codigo}&file=${file}&byall=${byall}`;
   // const headers = new HttpHeaders().set('Authorization', `Bearer ${this.TOKEN}`);
    return this.http.delete(url);
  }




}

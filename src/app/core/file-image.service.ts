import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
export class FileImageService {
  protected readonly apiUrl = environment.BASE_API;

  constructor(public httpclient: HttpClient) {

  }

  Create(alummno: Alummno) {
    const url = `${this.apiUrl}/api/FileImage/Create`;
    console.log('URL', url);
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpclient.post<Alummno>(url, alummno, { headers });
  }

  Get(): Observable<any> {
    const url = `${this.apiUrl}/api/FileImage`;
    return this.httpclient.get(url);
  }

  GetAlert(): Observable<any> {
    const url = `${this.apiUrl}/api/FileImage/GetAlerta`;
    return this.httpclient.get(url);
  }

  GetInformacionAlumno(codigo: string): Observable<any> {
    const url = `${this.apiUrl}/api/FileImage/GetInformacionAlumno/${codigo}`;
    return this.httpclient.get(url);
  }

  // SERVICIO COMPARE

  CreateCompare(alummno: Alummno) {
    const url = `${this.apiUrl}/api/Compare/PostImgAnalisis`;
    console.log('URL', url);
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpclient.post<Alummno>(url, alummno, { headers });
  }

  CompareAzureImage(codealumno: string, codeface: string, file: string): Observable<any> {
    const url = `${this.apiUrl}/api/Compare/CompareAzureImage?codealumno=${codealumno}&codeface=${codeface}&file=${file}`;
    return this.httpclient.get(url);
  }


}

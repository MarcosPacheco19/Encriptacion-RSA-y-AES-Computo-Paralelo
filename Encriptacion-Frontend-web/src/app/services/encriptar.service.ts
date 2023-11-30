import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncriptarService {

  private urlBackend = 'http://127.0.0.1:5000/api';

  constructor(private http: HttpClient) { }

  encriptarRSA(file: File) {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.urlBackend}/encriptar/rsa`, formData, { responseType: 'json' });
  }

  desencriptarRSA(file: File) {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.urlBackend}/desencriptar/rsa`, formData, { responseType: 'json' });
  }

  encriptarAES(file: File) {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.urlBackend}/encriptar/aes`, formData, { responseType: 'json' });
  }

  desencriptarAES(file: File) {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.urlBackend}/desencriptar/aes`, formData, { responseType: 'json' });
  }

  generarTxt(contenido: string, nombreArchivo: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.urlBackend}/descargar/texto`, { texto: contenido, nombre_archivo: nombreArchivo }, { headers, responseType: 'blob' });
  }
}
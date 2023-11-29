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

  generarTxt(contenido: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.urlBackend}/generar_txt`, { contenido }, { headers, responseType: 'blob' });
  }
  
  encriptacionAES(data: string) {
    return this.http.post('http://127.0.0.1:8000/aes_encrypt/', { input_text: data });
  }

  desencriptacionAES(data: string) {
    return this.http.post('http://127.0.0.1:8000/aes_decrypt/', { encrypted_text: data });
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncriptarService {

  constructor(private http: HttpClient) { }

  encriptacionRSA(data: string) {
    return this.http.post('http://127.0.0.1:5000/encriptar/rsa', { texto: data });
  }

  desencriptacionRSA(data: number[]) {
    return this.http.post('http://127.0.0.1:5000/desencriptar/rsa', { texto_encriptado: data });
  }

  encriptacionAES(data: string) {
    return this.http.post('http://127.0.0.1:8000/aes_encrypt/', { input_text: data });
  }

  desencriptacionAES(data: string) {
    return this.http.post('http://127.0.0.1:8000/aes_decrypt/', { encrypted_text: data });
  }
}

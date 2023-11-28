import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EncriptarService {

  constructor(private http: HttpClient) { }

  encriptacionRSA(data: string) {
    return this.http.post('http://127.0.0.1:8000/rsa_encrypt/', { input_text: data });
  }

  desencriptacionRSA(data: number[]) {
    return this.http.post('http://127.0.0.1:8000/rsa_decrypt/', { encrypted_data: data });
  }

  encriptacionAES(data: string) {
    return this.http.post('http://127.0.0.1:8000/aes_encrypt/', { input_text: data });
  }

  desencriptacionAESc(data: string) {
    return this.http.post('http://127.0.0.1:8000/aes_decrypt/', { encrypted_text: data });
  }
}

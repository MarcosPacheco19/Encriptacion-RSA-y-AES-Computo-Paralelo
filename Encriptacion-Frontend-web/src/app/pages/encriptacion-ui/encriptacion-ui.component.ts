import { Component } from '@angular/core';
import { EncriptarService } from 'src/app/services/encriptar.service';

@Component({
  selector: 'app-encriptacion-ui',
  templateUrl: './encriptacion-ui.component.html',
  styleUrls: ['./encriptacion-ui.component.css']
})
export class EncriptacionUIComponent {
  constructor(private encriptar: EncriptarService){}

  fileToUpload: File | null = null;
  contenidoTxt: string = '';

  handleFileInput(event: any) {
    this.fileToUpload = event.target.files.item(0);
  }

  handleTextareaInput(event: any) {
    this.contenidoTxt = event.target.value;
  }

  encriptarRSA() {
    if (this.fileToUpload) {
      this.encriptar.encriptarRSA(this.fileToUpload).subscribe(
        (response: any) => {
          console.log('Encriptación RSA:', response);
        },
        error => console.error(error)
      );
    }
  }

  desencriptarRSA() {
    if (this.fileToUpload) {
      this.encriptar.desencriptarRSA(this.fileToUpload).subscribe(
        (response: any) => {
          console.log('Desencriptación RSA:', response);
        },
        error => console.error(error)
      );
    }
  }

  descargarTxt() {
    if (this.contenidoTxt) {
      this.encriptar.generarTxt(this.contenidoTxt).subscribe(
        (data: Blob) => {
          const downloadURL = window.URL.createObjectURL(data);
          const link = document.createElement('a');
          link.href = downloadURL;
          link.download = "archivo.txt";
          link.click();
        },
        error => console.error(error)
      );
    }
  }

  encriptarAES(){

  }

  desencriptarAES(){
    
  }
}

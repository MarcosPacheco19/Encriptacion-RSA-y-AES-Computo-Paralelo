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
  fileName: string = '';

  handleFileInput(event: any) {
    const file = event.target.files.item(0);
    this.fileToUpload = file;
    this.fileName = file.name;

    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.contenidoTxt = fileReader.result as string;
      console.log('Contenido del archivo:', this.contenidoTxt);
    };
    fileReader.readAsText(file); 
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

  encriptarAES() {
    if (this.fileToUpload) {
      this.encriptar.encriptarAES(this.fileToUpload).subscribe(
        (response: any) => {
          console.log('Encriptación AES:', response);
        },
        error => console.error(error)
      );
    }
  }

  desencriptarAES() {
    if (this.fileToUpload) {
      this.encriptar.desencriptarAES(this.fileToUpload).subscribe(
        (response: any) => {
          console.log('Desencriptación AES:', response);
        },
        error => console.error(error)
      );
    }
  }

  descargarTxt() {
    if (this.contenidoTxt) {
      this.encriptar.generarTxt(this.contenidoTxt, 'archivo_descargado').subscribe(
        (data: Blob) => {
          const downloadURL = window.URL.createObjectURL(data);
          const link = document.createElement('a');
          link.href = downloadURL;
          link.download = "archivo_descargado.txt";
          link.click();
          window.URL.revokeObjectURL(downloadURL);
        },
        error => console.error('Error al descargar el archivo:', error)
      );
    }
  }  
}

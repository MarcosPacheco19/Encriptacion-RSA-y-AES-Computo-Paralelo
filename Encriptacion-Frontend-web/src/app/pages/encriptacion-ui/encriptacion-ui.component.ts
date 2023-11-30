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
  resultadoTxt: string = '';
  tipoProceso: string = '';
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

  procesarArchivo(accion: 'encriptarRSA' | 'desencriptarRSA' | 'encriptarAES' | 'desencriptarAES') {
    if (!this.fileToUpload) return;
  
    this.tipoProceso = accion; 
    const archivo = this.fileToUpload;
    const accionMap = {
      encriptarRSA: () => this.encriptar.encriptarRSA(archivo),
      desencriptarRSA: () => this.encriptar.desencriptarRSA(archivo),
      encriptarAES: () => this.encriptar.encriptarAES(archivo),
      desencriptarAES: () => this.encriptar.desencriptarAES(archivo)
    };
  
    accionMap[accion]().subscribe(
      (response: any) => {
        this.resultadoTxt = response.texto_encriptado || response.texto_desencriptado;
        console.log(`${accion}:`, response);
      },
      error => console.error(error)
    );
  }
  
  descargarTxt() {
    if (this.resultadoTxt) {
      const nombreArchivo = this.tipoProceso + '_descarga';
      this.encriptar.generarTxt(this.resultadoTxt, nombreArchivo).subscribe(
        (data: Blob) => {
          const downloadURL = window.URL.createObjectURL(data);
          const link = document.createElement('a');
          link.href = downloadURL;
          link.download = nombreArchivo;
          link.click();
          window.URL.revokeObjectURL(downloadURL);
          this.limpiarTextAreas();
        },
        error => console.error('Error al descargar el archivo:', error)
      );
    }
  } 

  limpiarTextAreas() {
    this.contenidoTxt = 'Contenido del .txt';
    this.resultadoTxt = 'Resultado';
  }
}

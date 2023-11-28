import { Component } from '@angular/core';
import { EncriptarService } from 'src/app/services/encriptar.service';

@Component({
  selector: 'app-encriptacion-ui',
  templateUrl: './encriptacion-ui.component.html',
  styleUrls: ['./encriptacion-ui.component.css']
})
export class EncriptacionUIComponent {
  constructor(private encriptar: EncriptarService){}

  texto = '';
  resultado = '';

  encriptarRSA(){
    this.encriptar.encriptacionRSA(this.texto).subscribe(
      response => {
        this.resultado = JSON.stringify(response);
      }
    )
  }

  desencriptarRSA(){
    this.encriptar.desencriptacionRSA(JSON.parse(this.texto)).subscribe(
      response => {
        this.resultado = JSON.stringify(response);
      }
    )
  }

  encriptarAES(){

  }

  desencriptarAES(){
    
  }

}

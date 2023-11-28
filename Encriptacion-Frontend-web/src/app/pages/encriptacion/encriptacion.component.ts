import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-encriptacion',
  standalone: true,
  imports: [CommonModule, FileUploadModule, HttpClientModule],
  templateUrl: './encriptacion.component.html',
  styleUrl: './encriptacion.component.css'
})
export class EncriptacionComponent {
  
}

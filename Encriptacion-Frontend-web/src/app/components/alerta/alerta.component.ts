import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.css']
})
export class AlertaComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  show: boolean = false;

  showAlert(title: string, message: string) {
    this.title = title;
    this.message = message;
    this.show = true;
  }

  closeAlert() {
    this.show = false;
  }
}

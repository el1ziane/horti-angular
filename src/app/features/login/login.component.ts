import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardFooter, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from './auth.service';
import { Usuario } from './usuario';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCard,FormsModule, MatCardHeader,MatCardTitle,CommonModule, MatCardSubtitle, MatCardContent, MatCardActions, MatCardFooter],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  usuario: Usuario = {
    _id: '',
    nome: '',
    email: '',
    senha: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

  hide = true;

  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  fazerLogin() {
    console.log(this.usuario);
    this.authService.fazerLogin(this.usuario);
  }
}

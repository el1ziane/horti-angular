import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-redefinir-senha',
  standalone: true,
  imports: [MatCard, MatCardContent, MatFormFieldModule, MatInputModule, MatInput, FormsModule, ReactiveFormsModule, MatIcon, NgIf, MatError],
  templateUrl: './redefinir-senha.component.html',
  styleUrls: ['./redefinir-senha.component.scss']
})
export class RedefinirSenhaComponent implements OnInit {
  public redefinirSenhaForm: FormGroup;
  private token: string | undefined;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder, // injeção de FormBuilder
    @Inject(ActivatedRoute) private route: ActivatedRoute,
    private router: Router
  ) {
    // Criação do FormGroup com validações
    this.redefinirSenhaForm = this.fb.group({
      novaSenha: ['', [Validators.required, Validators.minLength(8)]],
      confirmarSenha: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  redefinirSenha() {
    if (this.redefinirSenhaForm.valid) {
      const { novaSenha, confirmarSenha } = this.redefinirSenhaForm.value;
      if (novaSenha === confirmarSenha) {
        if (this.token) {
          this.authService.redefinirSenha(this.token, novaSenha).subscribe(
            response => {
              console.log('Senha redefinida com sucesso:', response.message);
              alert(response.message);
              this.router.navigate(['/login']);
            },
            error => {
              console.error('Erro ao redefinir a senha:', error);
              alert('Houve um erro ao tentar redefinir a senha. Tente novamente mais tarde.');
            }
          );
        } else {
          alert('Token não encontrado. Por favor, verifique o link que você recebeu.');
        }
      } else {
        alert('As senhas não coincidem. Por favor, tente novamente.');
      }
    } else {
      alert('Por favor, preencha todos os campos com uma senha de pelo menos 8 caracteres.');
    }
  }
}

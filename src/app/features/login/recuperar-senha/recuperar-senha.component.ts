import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../auth.service';
import { Usuario } from '../usuario';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recuperar-senha',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, CommonModule, MatIcon],
  templateUrl: './recuperar-senha.component.html',
  styleUrl: './recuperar-senha.component.scss'
})
export class RecuperarSenhaComponent {
  usuario: Usuario = { 
    _id: '',          // Inicializando com valor padrão
    nome: '',         // Inicializando com valor padrão
    email: '',        // Inicializando com valor padrão
    senha: ''         // Inicializando com valor padrão
  };

  constructor(private authService: AuthService, @Inject(ActivatedRoute) private route: ActivatedRoute) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    console.log(token); // Aqui você pode usar o token para validar a recuperação de senha
  }

  enviarEmailRecuperacao() {
    const email = this.usuario.email; // Assumindo que 'email' seja o campo do email
    if (email) {
        this.authService.enviarEmailRecuperacao(email).subscribe({
          next: (response) => {
            setTimeout(() => {
                alert('Um email de recuperação foi enviado. Verifique sua caixa de entrada.');
                console.log('Resposta do servidor:', response);

            }, 6000); // Atraso de 2 segundos
        },
        
            error: (error) => {
                // Trata o erro adequadamente
                if (error.status === 404) {
                    console.error('Usuário não encontrado:', error);
                    alert('Usuário com este email não encontrado. Por favor, verifique o email inserido.');
                } else {
                    console.error('Erro ao enviar o email de recuperação:', error);
                    alert('Houve um erro ao tentar enviar o email de recuperação. Tente novamente mais tarde.');
                }
            }
        });
    } else {
        alert('Por favor, insira seu email para recuperar a senha.');
    }
}


}

import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-redefinir-senha',
  standalone: true,
  imports: [MatCard, MatCardContent, MatFormFieldModule, MatInputModule, MatInput, FormsModule,MatIcon],
  templateUrl: './redefinir-senha.component.html',
  styleUrl: './redefinir-senha.component.scss'
})
export class RedefinirSenhaComponent {
  public novaSenha: string = '';
  public confirmarSenha: string = '';
  private token: string | undefined;

  constructor(private authService: AuthService, @Inject(ActivatedRoute) private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }


  redifinirSenha() {
    if (this.novaSenha && this.confirmarSenha) {
        if (this.novaSenha === this.confirmarSenha) {
            if (this.token) {
                this.authService.redefinirSenha(this.token, this.novaSenha).subscribe(
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
        alert('Por favor, preencha todos os campos antes de enviar.');
    }
}

}

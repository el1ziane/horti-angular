import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormUtilsService } from '../../../shared/form/form-utils.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-conta-usuario',
  standalone: true,
  imports: [MatCard, MatCardHeader, MatCardTitle,MatCardContent, MatFormField, MatLabel, MatInput, MatInputModule, MatFormFieldModule, FormsModule, NgIf, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCard,FormsModule, MatCardHeader,MatCardTitle,CommonModule, MatCardContent, ReactiveFormsModule],
  templateUrl: './conta-usuario.component.html',
  styleUrl: './conta-usuario.component.scss'
})
export class ContaUsuarioComponent implements OnInit{


  nomeEditavel: boolean = false;
  emailEditavel: boolean = false;
  senhaEditavel: boolean = false;
  usuario!: Usuario;
  formulario!: FormGroup;
  formularioSenha!: FormGroup;
  camposAlterarSenhaAtivos: boolean = false;
  hide: boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private _snackBar: MatSnackBar,
    private router: ActivatedRoute,
    public formUtils: FormUtilsService,
    private authService: AuthService
  )  {
    this.formulario = this.formBuilder.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });

    this.formularioSenha = this.formBuilder.group({
      senhaAtual: ['', [Validators.required]],
      novaSenha: ['', [Validators.required,  Validators.minLength(8)]],
      confirmarSenha: ['', [Validators.required,  Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
    const usuario: Usuario = this.router.snapshot.data['usuario'];

    if (usuario) {
      this.usuario = usuario;
      this.formulario.patchValue({
        nome: usuario.nome,
        email: usuario.email,
      });
    } else {
      console.error('Usuário não encontrado!');
    }
  }
  enviar(): void {
    if (this.formulario.valid) {
      const formValue = this.prepareSave();
      this.usuarioService.atualizarUsuario(formValue).subscribe(
        result => this.onSuccessedit(),
        error => this.onError()
      );
    } else {
      this.formUtils.validateAllFormFields(this.formulario);
      console.error('Formulário inválido!', this.formulario.errors);
    }
  }
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }
  habilitarEdicaoCampo(campo: string) {
    if (campo === 'nome') {
      this.nomeEditavel = true;
    } else if (campo === 'email') {
      this.emailEditavel = true;
    } else if (campo === 'senha') {
      this.senhaEditavel = true;
    }
  }


  atualizarUsuario(): void {
    this.enviar();
  }


  onSuccessedit(): void {
    this._snackBar.open("Usuário editado com sucesso!", '', { duration: 3000 });

  }
  private onError(): void {
    this._snackBar.open("Erro na atualização do usuário", '', { duration: 3000 });

  }


  private prepareSave(): any {
    const formValue = { ...this.formulario.value };
    formValue._id = Number(this.usuario._id);
    return formValue;
  }

  habilitarCamposSenha(): void {
    this.camposAlterarSenhaAtivos = true;
  }

  // Dentro do método redefinirSenha
  alterarSenha(): void {
    if (this.formularioSenha.valid) {
      const senhaAtual = this.formularioSenha.get('senhaAtual')?.value;
      const novaSenha = this.formularioSenha.get('novaSenha')?.value;
      const confirmarSenha = this.formularioSenha.get('confirmarSenha')?.value;

      if (novaSenha !== confirmarSenha) {
        alert('As novas senhas não coincidem. Tente novamente.');
        return;
      }

      this.usuarioService.alterarSenha(senhaAtual, novaSenha).subscribe(
        (response) => {
          console.log('Senha alterada com sucesso!', response);
          alert('Senha alterada com sucesso!');
        },
        (error) => {
          console.error('Erro ao alterar a senha:', error);
          alert('Houve um erro ao tentar alterar a senha. Tente novamente mais tarde.');
        }
      );
    } else {
      this.formUtils.validateAllFormFields(this.formularioSenha);
    }
  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

}

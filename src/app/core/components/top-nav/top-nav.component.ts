import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatDivider } from '@angular/material/divider';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { AuthService } from '../../../features/login/auth.service';

@Component({
    selector: 'app-top-nav',
    templateUrl: './top-nav.component.html',
    styleUrls: ['./top-nav.component.scss'],
    standalone: true,
    imports: [MatToolbar, MatIconButton, MatIcon, MatMenuTrigger, MatMenu, MatMenuItem, RouterLink, MatDivider]
})
export class TopNavComponent implements OnInit {
  mostrarMenu: boolean = false;
  userId: number;
  @Output() sideNavToggled = new EventEmitter<void>();
  constructor(private readonly router: Router,  private authService: AuthService) {  this.userId = 1;}

  ngOnInit() {
    // Escutando mudanças no estado do menu
    this.authService.mostrarMenuEmitter.subscribe((isAuthenticated: boolean) => {
      this.mostrarMenu = isAuthenticated;
    });
    
    // Verifica o estado inicial de autenticação
    this.mostrarMenu = this.authService.isUsuarioAutenticado();
  }


  toggleSidebar(): void {
    this.sideNavToggled.emit();
  }

  onLoggedout() {
    this.authService.fazerLogout();
  }
}

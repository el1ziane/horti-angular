import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatDivider } from '@angular/material/divider';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
    selector: 'app-top-nav',
    templateUrl: './top-nav.component.html',
    styleUrls: ['./top-nav.component.scss'],
    standalone: true,
    imports: [MatToolbar, MatIconButton, MatIcon, MatMenuTrigger, MatMenu, MatMenuItem, RouterLink, MatDivider]
})
export class TopNavComponent implements OnInit {
  @Output() sideNavToggled = new EventEmitter<void>();
  constructor(private readonly router: Router) {}

  ngOnInit() {}

  toggleSidebar(): void {
    this.sideNavToggled.emit();
  }

  onLoggedout() {
    localStorage.removeItem('isLoggedin');
    this.router.navigate(['/']);
  }
}

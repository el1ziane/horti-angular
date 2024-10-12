import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';

import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { RouterOutlet } from '@angular/router';
import { SideNavClosedComponent } from './core/components/side-nav-left/side-nav-closed/side-nav-closed.component';
import { NgStyle, NgIf } from '@angular/common';
import { TopNavComponent } from './core/components/top-nav/top-nav.component';
import { SideNavComponent } from './core/components/side-nav-left/side-nav/side-nav.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [TopNavComponent, MatSidenavContainer, MatSidenav, NgStyle, NgIf, SideNavComponent, SideNavClosedComponent, MatSidenavContent, RouterOutlet, SideNavComponent],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  title = 'Material-Side-Navbar-In-Angular';

  @ViewChild(MatSidenavContainer) sidenavContainer!: MatSidenavContainer;
  @ViewChild('snav') sideNav!: MatSidenav;
  sideNavDefaultOpened = true;
  showFullMenu = true;
  isExpanded = true;
  closedWidth = 90;
  openedWidth = 250;
  isMobile!: boolean;
  sideNavMode: 'side' | 'over' = 'side';
  hasBackdrop: boolean = false;
  toolBarHeight = 64;
  private readonly mediaWatcher: Observable<boolean>;
  isDarkTheme: boolean = false;
  private mediaSub!: Subscription;

  constructor(@Inject(MediaObserver) private media: MediaObserver) {
    this.mediaWatcher = media.asObservable()
      .pipe(
        map((changes: MediaChange[]) =>
          changes.some((change: MediaChange) => {
            console.log('MediaChange:', change.mqAlias);
            if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
              if (this.sideNavDefaultOpened) {
                this.sideNavDefaultOpened = false;
                this.isExpanded = false;
              }
              this.isMobile = true;
              this.showFullMenu = true;
              this.sideNavMode = 'over';
              this.hasBackdrop = true;
            } else {
              this.isMobile = false;
              this.sideNavDefaultOpened = true;
              this.sideNavMode = 'side';
              this.hasBackdrop = false;
            }

            if (change.mqAlias === 'xs') {
              this.toolBarHeight = 56;
            } else {
              this.toolBarHeight = 64;
            }
            return true;
          })
        )
      );
  }

  ngAfterViewInit(): void {
    this.sidenavContainer.scrollable.elementScrolled().subscribe((a: any) => {

    });
  }

  ngOnInit() {
    this.mediaSub = this.mediaWatcher.subscribe();
  }

  ngOnDestroy(): void {
    if (this.mediaSub) {
      this.mediaSub.unsubscribe();
    }
  }

  onToolbarMenuToggle() {
    if (this.isMobile) {
      this.sideNav.toggle();
    } else {
      if (!this.isExpanded) {
        this.showFullMenu = true;
      } else {
        this.showFullMenu = false;
      }
    }
    this.isExpanded = !this.isExpanded;
  }
}

import { Component, OnInit } from '@angular/core';
import { childRoutes } from '../../child-routes';
import { MatIcon } from '@angular/material/icon';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { MatNavList, MatListItem } from '@angular/material/list';

@Component({
    selector: 'app-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss'],
    standalone: true,
    imports: [MatNavList, NgFor, MatListItem, RouterLinkActive, RouterLink, MatIcon]
})
export class SideNavComponent implements OnInit {
  routes = childRoutes;
  constructor(
    ) {}

  ngOnInit() { /* TODO document why this method 'ngOnInit' is empty */ }
}

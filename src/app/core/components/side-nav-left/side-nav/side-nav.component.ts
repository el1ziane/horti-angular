import { Component, OnInit } from '@angular/core';

import { MatIcon } from '@angular/material/icon';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { MatNavList, MatListItem } from '@angular/material/list';
import { childRoutes } from '../../../../child-routes';

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

  ngOnInit() { }
}

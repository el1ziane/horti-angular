import { Component, OnInit } from '@angular/core';
import { childRoutes } from '../../child-routes';
import { MatIcon } from '@angular/material/icon';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { MatNavList, MatListItem } from '@angular/material/list';

@Component({
    selector: 'app-side-nav-closed',
    templateUrl: './side-nav-closed.component.html',
    styleUrls: ['./side-nav-closed.component.scss'],
    standalone: true,
    imports: [
        MatNavList,
        NgFor,
        MatListItem,
        RouterLinkActive,
        RouterLink,
        MatIcon,
    ],
})
export class SideNavClosedComponent implements OnInit {
  routes = childRoutes;
  constructor() { }

  ngOnInit(): void {
  }

}

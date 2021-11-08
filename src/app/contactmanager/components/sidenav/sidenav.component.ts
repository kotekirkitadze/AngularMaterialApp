import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout'
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { Direction } from '@angular/cdk/bidi';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  @ViewChild(MatDrawer) sidenav: MatDrawer;

  constructor(private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private router: Router) { }

  public isScreenSmall: boolean;
  users: Observable<User[]>;
  isDarkTheme: boolean = false;
  dir: Direction = 'ltr';

  ngOnInit(): void {

    this.breakpointObserver.observe([
      `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`
    ]).subscribe(
      state => {
        this.isScreenSmall = state.matches
      }
    );

    this.users = this.userService.users;
    this.userService.loadAll();

    this.users.subscribe(data => {
      if (data.length > 0) this.router.navigate(['/contactmanager', data[0].id])
    });

    this.router.events.subscribe(() => {
      if (this.isScreenSmall) {
        this.sidenav.close()
      }
    })

  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }

  toggleDir() {
    this.dir = this.dir == 'ltr' ? 'rtl' : 'ltr';
  }
}

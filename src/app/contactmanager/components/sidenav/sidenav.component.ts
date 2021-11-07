import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout'
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(private breakpointObserver: BreakpointObserver,
    private userService: UserService) { }

  public isScreenSmall: boolean;
  users: Observable<User[]>;

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
      console.log(data);
    })

  }

  showInfo(d) {

  }

}

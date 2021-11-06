import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout'

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  constructor(private breakpointObserver: BreakpointObserver) { }
  public isScreenSmall: boolean;
  ngOnInit(): void {

    this.breakpointObserver.observe([
      `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`
    ]).subscribe(
      state => {
        this.isScreenSmall = state.matches
      }
    )

  }

}

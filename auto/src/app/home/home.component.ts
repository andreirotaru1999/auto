import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public isMobile = false;
  public navbarItems = [
    {
      title: 'Intrebari',
      type: 'link',
      icon: 'chart-pie',
      route: '/questions',
    },
    {
      title: 'Chestionar',
      type: 'link',
      icon: 'cog',
      route: '/test'
    },
    {
      title: 'Legislatie',
      type: 'link',
      icon: 'cog',
      route: '/legislation'
    }
  ]

  constructor(
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver.observe([
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      this.isMobile = !!result.matches;
    });
  }



  ngOnInit(): void {
  }

  logout() {

  }

}

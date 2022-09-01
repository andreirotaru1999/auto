import {Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {HttpClient} from "@angular/common/http";
import { Router, Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';
import { LoginService } from '../core/services/data/login.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public isMobile = false;
  public authentificated = false;
  public navbarItems = [
    {
      title: 'Întrebari',
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
    private http: HttpClient,
    private loginService:LoginService
  ) {}

  ngOnInit(): void {
    this.loginService.getUser().subscribe(
      (rez: any) => {
        if (rez) {
          this.authentificated = true;
        }
      },
    );
    this.loginService.isLoggedIn.subscribe((rezult) => {
      this.authentificated = rezult;
    })
  }

  logout(): void {
    this.loginService.logout().subscribe(()=> this.authentificated = false)
  }

}

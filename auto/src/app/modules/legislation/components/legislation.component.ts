import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-legislation',
  templateUrl: './legislation.component.html',
  styleUrls: ['./legislation.component.scss']
})
export class LegislationComponent implements OnInit, AfterViewInit{

  constructor(private http: HttpClient, private activeRoute: ActivatedRoute, ) { }
  @ViewChild('container') container: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {

    this.activeRoute.params.subscribe(param => {
      // alert(param.pageSec)
      if(param['pageSec']){
        const section = this.container.nativeElement.querySelector(`#${param['pageSec']}`)
        console.log(section)

        section?.scrollIntoView()
      }
    })

  }

  ngOnInit(): void {
  }

}

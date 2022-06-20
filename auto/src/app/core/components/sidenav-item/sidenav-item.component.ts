import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from '../../services/helpers/storage.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { IconPrefix, IconName } from '@fortawesome/fontawesome-common-types';

@Component({
  selector: 'app-sidenav-item',
  templateUrl: './sidenav-item.component.html',
  styleUrls: ['./sidenav-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class SidenavItemComponent implements OnInit {

  @Input() item: any;
  @Input() depth: number;
  @Input() sidenav: any;
  public user;
  public visibleToUser: boolean;

  constructor(
    public router: Router,
    private storageService: StorageService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.user = this.storageService.get('user');
    if (this.item.allowedRoles) {
      this.visibleToUser = this.item.allowedRoles.includes(this.user.role);
    } else {
      this.visibleToUser = true;
    }
  }

  /**
   * Toggle a parent type navbar item and recalculate the width of the navbar.
   * @param item => a sidenav item.
   */
  toggleParent(item) {
    item.expanded = !item.expanded;
  }

  closeSidenav() {
    this.sidenav.close();

    if (this.item.type === 'dialog') {
      this.dialog.open(this.item.dialog, this.item.config || {});
    }
  }

  getIcon(item) {
    return ['fas', item.icon] as [IconPrefix, IconName];
  }
}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faChartPie, faHome, faCog, faUser, faSignInAlt, faSignOutAlt, faAngleRight, faInfoCircle, faBars } from '@fortawesome/free-solid-svg-icons';
import { faBell, faEnvelope, faWindowClose } from '@fortawesome/free-regular-svg-icons';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FontAwesomeModule,
  ],
  declarations: [
    LoadingComponent
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FontAwesomeModule,
    LoadingComponent
  ],
  providers: []
})

export class SharedModule {
  constructor(
    private library: FaIconLibrary
  ) {
    this.library.addIcons(faHome, faChartPie, faBell, faCog, faUser, faSignInAlt, faSignOutAlt, faAngleRight, faEnvelope, faWindowClose, faInfoCircle, faBars);

  }
}

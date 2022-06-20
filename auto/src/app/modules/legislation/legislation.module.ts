import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { LegislationComponent } from './components/legislation.component';
import { LegislationRoutingModule } from './legislation-routing.module';

@NgModule({
  imports: [
    SharedModule,
    LegislationRoutingModule
  ],
  declarations: [
    LegislationComponent
  ],
  providers: []
})

export class LegislationModule {}

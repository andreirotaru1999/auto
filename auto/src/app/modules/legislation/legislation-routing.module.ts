import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LegislationComponent } from './components/legislation.component';

const routes: Routes = [
  {
    path: '',
    component: LegislationComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LegislationRoutingModule {}



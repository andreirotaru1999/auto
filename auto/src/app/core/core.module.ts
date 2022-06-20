import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { SidenavItemComponent } from './components/sidenav-item/sidenav-item.component';
import { StorageService } from './services/helpers/storage.service';
import { QuestionService } from './services/data/question.service';

@NgModule({
  declarations: [SidenavItemComponent],
  imports: [SharedModule, HttpClientModule],
  exports: [SidenavItemComponent],
  providers: [StorageService, QuestionService]
})

export class CoreModule {}

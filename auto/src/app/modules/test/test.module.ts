import { NgModule } from '@angular/core';
import { TestComponent } from './components/test/test.component';
import { SharedModule } from '../../shared/shared.module';
import { TestRoutingModule } from './test-routing.module';

@NgModule({
  declarations: [TestComponent],
  imports: [SharedModule, TestRoutingModule],
  providers: []
})

export class TestModule {}

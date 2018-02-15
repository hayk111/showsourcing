import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagComponent } from './components/tag/tag.component';
import { AppStoreModule } from '../../store/store.module';

@NgModule({
  imports: [
		CommonModule,
		AppStoreModule.forChild()
  ],
	declarations: [ TagComponent ],
	exports: [ TagComponent ]
})
export class TagModule { }

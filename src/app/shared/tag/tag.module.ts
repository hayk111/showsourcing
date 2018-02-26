import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppStoreModule } from '~store/store.module';

import { TagComponent } from './components/tag/tag.component';

@NgModule({
	imports: [CommonModule, AppStoreModule.forChild()],
	declarations: [TagComponent],
	exports: [TagComponent],
})
export class TagModule {}

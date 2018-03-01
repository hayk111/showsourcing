import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EntityModule } from '~entity';
import { TagComponent } from './components/tag/tag.component';

@NgModule({
	imports: [CommonModule, EntityModule.forChild()],
	declarations: [TagComponent],
	exports: [TagComponent],
})
export class TagModule {}

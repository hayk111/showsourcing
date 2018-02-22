import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectableImageComponent } from './components/selectable-image/selectable-image.component';
import { IconsModule } from '../icons/icons.module';
import { RatingModule } from '../rating/rating.module';

// image displayed, when hovering the image some actions can be taken
@NgModule({
	imports: [CommonModule, IconsModule, RatingModule],
	declarations: [SelectableImageComponent],
	exports: [SelectableImageComponent]
})
export class SelectableImageModule {}

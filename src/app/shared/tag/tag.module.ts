import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TagComponent } from '~shared/tag/components/tag/tag.component';
import { TagListComponent } from '~shared/tag/components/tag-list/tag-list.component';
import { IconsModule } from '~shared/icons';

@NgModule({
	imports: [CommonModule, IconsModule],
	declarations: [TagComponent, TagListComponent],
	exports: [TagComponent, TagListComponent],
})
export class TagModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TagComponent } from '~shared/tag/components/tag/tag.component';
import { TagListComponent } from '~shared/tag/components/tag-list/tag-list.component';
import { IconsModule } from '~shared/icons';
import { StatusTagComponent } from '~shared/tag/components/status-tag/status-tag.component';

@NgModule({
	imports: [CommonModule, IconsModule],
	declarations: [TagComponent, TagListComponent, StatusTagComponent],
	exports: [TagComponent, TagListComponent, StatusTagComponent],
})
export class TagModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TagComponent } from './components/tag/tag.component';
import { TagListComponent } from './components/tag-list/tag-list.component';

@NgModule({
	imports: [CommonModule],
	declarations: [TagComponent, TagListComponent],
	exports: [TagComponent, TagListComponent],
})
export class TagModule { }

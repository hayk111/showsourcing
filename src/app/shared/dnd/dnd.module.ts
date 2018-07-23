import { NgModule } from '@angular/core';
import { ContextMenuModule } from '~shared/context-menu/context-menu.module';

import { DroppableService } from './services/droppable.service';
import { DraggableDirective, MovableDirective, DropzoneDirective } from './components';

@NgModule({
	imports: [
	],
	declarations: [DraggableDirective, MovableDirective, DropzoneDirective],
	exports: [DraggableDirective, MovableDirective, DropzoneDirective],
	providers: [DroppableService]
})
export class DndModule { }

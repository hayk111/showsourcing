import { NgModule } from '@angular/core';
import { ContextMenuModule } from '~shared/context-menu/context-menu.module';

import { DroppableService } from '~shared/dnd/services/droppable.service';
import { DraggableDirective, MovableDirective, DropzoneDirective } from '~shared/dnd/components';

@NgModule({
	imports: [
	],
	declarations: [DraggableDirective, MovableDirective, DropzoneDirective],
	exports: [DraggableDirective, MovableDirective, DropzoneDirective],
	providers: [DroppableService]
})
export class DndModule { }

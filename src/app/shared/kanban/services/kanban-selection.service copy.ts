import { Injectable } from '@angular/core';


@Injectable({
	providedIn: 'root'
})
export class KanbanSelectionService2 {
	data$;
	selection$;
	selectedColumn$;
}

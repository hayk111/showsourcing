import { AppImage } from '~models/app-image.model';
import { Booth } from '~models/booth.model';
import { EventDescription } from '~models/event-description.model';

// show is actually called event on the back-end but since we have two event types (one from team realm)
// and this one from global-constants
export interface Show {
	id: string;
	description: EventDescription;
	booth: Booth;
	saved: boolean;
}

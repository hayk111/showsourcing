import { AppImage } from '~core/ORM/models/app-image.model';
import { Booth } from '~core/ORM/models/booth.model';
import { EventDescription } from '~core/ORM/models/event-description.model';

// show is actually called event on the back-end but since we have two event types (one from team realm)
// and this one from global-constants
export class Show {
	id: string;
	description: EventDescription;
	booths: Booth[];
	saved: boolean;
}

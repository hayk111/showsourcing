import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class MembersInvitationService {
	private _invitationOpen = new Subject<undefined>();
	invitationOpen$ = this._invitationOpen.asObservable();

	openInvitationDlg() {
		this._invitationOpen.next();
	}
}

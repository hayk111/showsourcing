import { Component } from '@angular/core';
import { routerAnimation } from '~shared/template/components/animation';

@Component({
	selector: 'workspace-app',
	templateUrl: './workspace.component.html',
	styleUrls: ['./workspace.component.scss'],
	animations: [
		routerAnimation
	]
})
export class WorkspaceComponent {

}

import { Component } from '@angular/core';
import { routerAnimation } from '~core/template/components/animation';

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

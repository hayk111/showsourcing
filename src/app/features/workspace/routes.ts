import { Route } from '@angular/router';
import { WorkspaceComponent } from '~features/workspace/containers/workspace/workspace.component';
import { MyWorkflowPageComponent } from '~features/workspace/containers/my-workflow-page/my-workflow-page.component';
import { MyTasksPageComponent } from '~features/workspace/containers/my-tasks-page/my-tasks-page.component';
import { ReviewPageComponent } from '~features/workspace/containers/review-page/review-page.component';
import { MySamplePageComponent, MySampleListPageComponent, MySampleBoardPageComponent } from './containers';

export const routes: Array<Route> = [
	{
		path: '',
		component: WorkspaceComponent,
		children: [
			{ path: 'review', component: ReviewPageComponent },
			{ path: 'my-workflow', component: MyWorkflowPageComponent },
			{ path: 'my-tasks', component: MyTasksPageComponent },
			{
				path: 'my-samples', component: MySamplePageComponent, children: [
					{ path: '', redirectTo: 'list', pathMatch: 'full' },
					{ path: 'list', component: MySampleListPageComponent },
					{ path: 'board', component: MySampleBoardPageComponent }
				]
			},
			{ path: '', redirectTo: 'review', pathMatch: 'full' }
		],
	}
];


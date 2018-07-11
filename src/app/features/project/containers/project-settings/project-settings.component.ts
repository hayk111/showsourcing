import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '~global-services';
import { switchMap, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Project } from '~models/project.model';

@Component({
	selector: 'project-settings-app',
	templateUrl: './project-settings.component.html',
	styleUrls: ['./project-settings.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectSettingsComponent implements OnInit {
	project$: Observable<Project>;

	constructor(private route: ActivatedRoute, private projectSrv: ProjectService) { }

	ngOnInit() {
		this.project$ = this.route.parent.params.pipe(
			map(params => params.id),
			switchMap(id => this.projectSrv.selectOne(id))
		);
	}

}

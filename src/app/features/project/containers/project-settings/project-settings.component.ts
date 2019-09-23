import { ChangeDetectionStrategy, Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { ProjectService } from '~entity-services';
import { ERM, Project } from '~models';
import { UploaderService } from '~shared/file/services/uploader.service';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'project-settings-app',
	templateUrl: './project-settings.component.html',
	styleUrls: ['./project-settings.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectSettingsComponent extends AutoUnsub implements OnInit {

	@Output() delete = new EventEmitter<Project>();
	@Output() archive = new EventEmitter<Project>();

	project$: Observable<Project>;
	form: FormGroup;
	id: string;
	erm = ERM;

	constructor(
		private	router: Router,
		private route: ActivatedRoute,
		private projectSrv: ProjectService,
		private fb: FormBuilder,
		private uploader: UploaderService
	) {
		super();
	}

	ngOnInit() {
		const group = this.fb.group({
			name: ['', Validators.required],
			description: ''
		});
		this.form = new FormGroup(group.controls, { updateOn: 'blur' });

		this.project$ = this.route.parent.params.pipe(
			map(params => params.id),
			tap(id => this.id = id),
			switchMap(id => this.projectSrv.selectOne(id)),
		);

		this.project$.pipe(
			take(1),
			tap(proj => this.form.patchValue(proj)),
			switchMap(_ => this.form.valueChanges.pipe(takeUntil(this._destroy$))),
			takeUntil(this._destroy$)
		).subscribe(proj => this.updateProject(proj));

	}

	onNewFiles(files: File[]) {
		this.uploader.uploadImages(files)
			.subscribe(imgs => this.updateProject({ logoImage: imgs[0] }));
	}

	updateProject(proj: Project) {
		this.projectSrv.update({ id: this.id, ...proj }).subscribe();
	}

	getTabPanelUrl(panel: 'products' | 'settings'): string {
		return this.router.url.substring(0, this.router.url.lastIndexOf('/') + 1) + panel;
	}
}

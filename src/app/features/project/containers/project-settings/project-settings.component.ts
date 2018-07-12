import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '~global-services';
import { switchMap, map, tap, takeUntil, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Project } from '~models/project.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppImage } from '~models';
import { AutoUnsub } from '~utils';
import { UploaderService } from '~shared/file/services/uploader.service';

@Component({
	selector: 'project-settings-app',
	templateUrl: './project-settings.component.html',
	styleUrls: ['./project-settings.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectSettingsComponent extends AutoUnsub implements OnInit {
	project$: Observable<Project>;
	form: FormGroup;
	id: string;
	constructor(
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
		this.uploader.uploadImages(files).subscribe(imgs => {
			this.updateProject({ logoImage: imgs[0] });
		});
	}

	updateProject(proj: Project) {
		this.projectSrv.update({ id: this.id, ...proj }).subscribe();
	}

}

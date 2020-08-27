import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { api } from 'lib';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ERM, ProjectService } from '~core/erm';
import { Project } from '~core/erm3/models';
import { ListHelper2Service } from '~core/list-page2';
import { UploaderService } from '~shared/file/services/uploader.service';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'settings-page-app',
	templateUrl: './settings-page.component.html',
	styleUrls: ['./settings-page.component.scss'],
	providers: [ListHelper2Service],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPageComponent extends AutoUnsub implements OnInit {

	@Output() delete = new EventEmitter<Project>();
	@Output() archive = new EventEmitter<Project>();

	project$: Observable<Project>;
	form: FormGroup;
	id: string;
	erm = ERM;

	constructor(
		private route: ActivatedRoute,
		private projectSrv: ProjectService,
		private fb: FormBuilder,
		private uploader: UploaderService,
		public translate: TranslateService,
		private listHelper: ListHelper2Service,
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
			switchMap(id => api.Project.get$(id).data$),
		) as any;

		// this.project$.pipe(
		// 	take(1),
		// 	tap(proj => this.form.patchValue(proj)),
		// 	switchMap(_ => this.form.valueChanges.pipe(takeUntil(this._destroy$))),
		// 	takeUntil(this._destroy$)
		// ).subscribe(proj => this.updateProject(proj));

	}

	onNewFiles(files: File[]) {
		// this.uploaderSrv.uploadImages(files, this.nodeId)
		// 	.onTempImages( tempImgs => do something with pending imgs)
		// 	.subscribe(_ => do something when upload finishes)
	}

	updateProject(proj: Project) {
		// this.projectSrv.update({ id: this.id, ...proj }).subscribe();
	}

	update(value: any, prop: string) {
		this.listHelper.update({
			id: this.id,
			[prop]: value
		}, 'Project');
	}

}

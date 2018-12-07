import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { AutoUnsub } from '~utils';
import { SampleService } from '~core/entity-services';
import { Sample, ERM, AppImage, Comment } from '~core/models';
import { Observable } from 'rxjs';
import { CustomField } from '~shared/dynamic-forms';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'preview-sample-app',
	templateUrl: './preview-sample.component.html',
	styleUrls: ['./preview-sample.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewSampleComponent extends AutoUnsub implements OnInit {

	@Input() set sample(value: Sample) {
		this._sample = value;
	}
	@Output() close = new EventEmitter<null>();

	sample$: Observable<Sample>;
	private _sample: Sample;
	selectedIndex = 0;
	modalOpen = false;
	erm = ERM;

	customFields: CustomField[] = [
		{ name: 'name', type: 'text', required: true, label: 'name' },
		{ name: 'supplier', type: 'selector', metadata: { target: 'supplier', type: 'entity', labelName: 'name', canCreate: true } },
		{ name: 'product', type: 'selector', metadata: { target: 'product', type: 'entity', labelName: 'name', canCreate: true } },
		{ name: 'price', type: 'price' },
		{ name: 'paid', type: 'yesNo' },
		{ name: 'createdOn', type: 'selector', metadata: { target: 'user', type: 'entity', labelName: 'name' } },
		{
			name: 'assignee', label: 'Assignee', type: 'selector',
			metadata: { target: 'user', type: 'entity', labelName: 'name' }
		},
		{ name: 'createdBy', type: 'selector', metadata: { target: 'user', type: 'entity', labelName: 'name' } },

	];

	constructor(
		private sampleSrv: SampleService) {
		super();
	}

	ngOnInit() {
		this.sample$ = this.sampleSrv.selectOne(this._sample.id);
		this.sample$.pipe(takeUntil(this._destroy$))
			.subscribe(s => this._sample = s);
	}

	update(value: any, prop: string) {
		this.sampleSrv.update({ id: this._sample.id, [prop]: value }).subscribe();
	}

	// dyanmic form update
	updateSample(sample: Sample) {
		this.sampleSrv.update({ id: this._sample.id, ...sample }).subscribe();
	}

	addComment(comment: Comment) {
		const comments = [...(this._sample.comments || [])];
		comments.push(comment as any);
		this.sampleSrv.update({ id: this._sample.id, comments }).subscribe();
	}
}

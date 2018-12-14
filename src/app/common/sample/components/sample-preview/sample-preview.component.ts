import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SampleService } from '~core/entity-services';
import { Comment, ERM, Sample } from '~core/models';
import { CustomField } from '~shared/dynamic-forms';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'sample-preview-app',
	templateUrl: './sample-preview.component.html',
	styleUrls: ['./sample-preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SamplePreviewComponent extends AutoUnsub implements OnInit {

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
		this.sample$ = this.sampleSrv.queryOne(this._sample.id);
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

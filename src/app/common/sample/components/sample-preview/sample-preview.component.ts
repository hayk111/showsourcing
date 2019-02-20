import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { SampleService, UserService } from '~core/entity-services';
import { CustomField } from '~shared/dynamic-forms';
import { AutoUnsub } from '~utils';
import { CommentService } from '~core/entity-services/comment/comment.service';
import { Sample, ERM, Comment } from '~core/models';
import { Router } from '@angular/router';

@Component({
	selector: 'sample-preview-app',
	templateUrl: './sample-preview.component.html',
	styleUrls: ['./sample-preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SamplePreviewComponent extends AutoUnsub implements OnChanges {

	private _sample: Sample;
	@Input() set sample(value: Sample) {
		this._sample = value;
	}
	get sample() {
		return this._sample;
	}

	@Output() close = new EventEmitter<null>();

	sample$: Observable<Sample>;
	selectedIndex = 0;
	modalOpen = false;
	erm = ERM;

	customFields: CustomField[] = [
		{ name: 'name', type: 'text', required: true, label: 'name' },
		{ name: 'supplier', type: 'selector', metadata: { target: 'supplier', type: 'entity', labelName: 'name', canCreate: true } },
		{ name: 'product', type: 'selector', metadata: { target: 'product', type: 'entity', labelName: 'name', canCreate: true } },
		{ name: 'price', type: 'price' },
		{ name: 'paid', type: 'yesNo' },
		{
			name: 'assignee', label: 'Assignee', type: 'selector',
			metadata: { target: 'user', type: 'entity', labelName: 'name' }
		},
		{ name: 'createdBy', label: 'Created By', type: 'selector', metadata: { target: 'user', type: 'entity', labelName: 'name' } },

	];

	constructor(
		private commentSrv: CommentService,
		private router: Router,
		private userSrv: UserService,
		private sampleSrv: SampleService) {
		super();
	}

	ngOnChanges() {
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
		// if we don't specify the user, when we get out of the preview and then comeback, the info displayed will be without the user info
		const commentUser = { ...comment, createdBy: this.userSrv.userSync };
		const comments = [...(this._sample.comments || [])];
		comments.push(commentUser as any);
		this.commentSrv.create(comment).pipe(
			switchMap(_ => this.sampleSrv.update({ id: this._sample.id, comments }))
		).subscribe();
	}

	openSupplier() {
		this.router.navigate(['supplier', 'details', this.sample.supplier.id]);
	}

	openProduct() {
		this.router.navigate(['product', 'details', this.sample.product.id]);
	}
}

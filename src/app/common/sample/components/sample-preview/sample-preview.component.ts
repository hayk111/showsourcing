import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { SampleDescriptor } from '~core/descriptors';
import { SampleService, UserService } from '~core/entity-services';
import { CommentService } from '~core/entity-services/comment/comment.service';
import {
	ExtendedFieldDefinitionService,
} from '~core/entity-services/extended-field-definition/extended-field-definition.service';
import { Comment, ERM, ExtendedFieldDefinition, Sample } from '~core/models';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'sample-preview-app',
	templateUrl: './sample-preview.component.html',
	styleUrls: ['./sample-preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SamplePreviewComponent extends AutoUnsub implements OnInit, OnChanges {

	private _sample: Sample;
	@Input() set sample(value: Sample) {
		this._sample = value;
	}
	get sample() {
		return this._sample;
	}

	@Output() close = new EventEmitter<null>();

	sample$: Observable<Sample>;
	sampleDescriptor: SampleDescriptor;
	selectedIndex = 0;
	modalOpen = false;
	erm = ERM;

	fieldDefinitions$: Observable<ExtendedFieldDefinition[]>;

	constructor(
		private commentSrv: CommentService,
		private router: Router,
		private userSrv: UserService,
		private sampleSrv: SampleService,
		private extendedFieldDefSrv: ExtendedFieldDefinitionService
	) {
		super();
	}

	ngOnInit() {
		this.sampleDescriptor = new SampleDescriptor([
			'name', 'supplier', 'product', 'price', 'paid', 'assignee', 'createdBy'
		]);
		this.sampleDescriptor.modify([
			{ name: 'product', metadata: { hasBadge: false } },
			{ name: 'supplier', metadata: { hasBadge: false } }
		]);

		this.fieldDefinitions$ = this.extendedFieldDefSrv.queryMany({ query: 'target == "sample.extendedFields"' });
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
		this.router.navigate(['supplier', this.sample.supplier.id]);
	}

	openProduct() {
		this.router.navigate(['product', this.sample.product.id]);
	}
}

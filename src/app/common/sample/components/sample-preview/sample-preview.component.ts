import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { SampleService, UserService } from '~core/entity-services';
import { CommentService } from '~core/entity-services/comment/comment.service';
import { Comment, ERM, Sample, ExtendedFieldDefinition } from '~core/models';
import { DynamicField } from '~shared/dynamic-forms';
import { AutoUnsub, translate } from '~utils';
import {
	ExtendedFieldDefinitionService,
} from '~core/entity-services/extended-field-definition/extended-field-definition.service';

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
	selectedIndex = 0;
	modalOpen = false;
	erm = ERM;

	fieldDefinitions$: Observable<ExtendedFieldDefinition[]>;
	customFields: DynamicField[] = [
		{ name: 'name', type: 'text', required: true, label: translate('name', 'message') },
		{
			name: 'supplier', type: 'selector', label: translate(ERM.SUPPLIER.singular, 'erm'),
			metadata: { target: ERM.SUPPLIER.singular, type: 'entity', labelName: 'name', canCreate: true }
		},
		{
			name: 'product', type: 'selector', label: translate(ERM.PRODUCT.singular, 'erm'),
			metadata: { target: ERM.PRODUCT.singular, type: 'entity', labelName: 'name', canCreate: true }
		},
		{ name: 'price', type: 'price', label: translate(ERM.PRICE.singular, 'erm') },
		{ name: 'paid', type: 'boolean', label: translate('paid', 'message') },
		{
			name: 'assignee', label: translate('assignee', 'message'), type: 'selector',
			metadata: { target: ERM.USER.singular, type: 'entity', labelName: 'name' }
		},
		{
			name: 'createdBy', label: translate('created by', 'message'), type: 'selector',
			metadata: { target: ERM.USER.singular, type: 'entity', labelName: 'name' }
		},

	];

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

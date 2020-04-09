import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { SampleDescriptor } from '~core/descriptors';
import { SampleService, UserService } from '~core/erm';
import { CommentService } from '~core/erm';
import { ExtendedFieldDefinitionService } from '~core/erm';
import { Comment, ERM, ExtendedFieldDefinition, Product } from '~core/erm';
import { Sample } from '~core/erm3/models';
import { DynamicFormConfig } from '~shared/dynamic-forms/models/dynamic-form-config.interface';
import { PreviewCommentComponent, PreviewService } from '~shared/preview';
import { AutoUnsub } from '~utils';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ApiService } from '~core/erm3/services/api.service';

@Component({
	selector: 'sample-preview-app',
	templateUrl: './sample-preview.component.html',
	styleUrls: ['./sample-preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
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

	@ViewChild(PreviewCommentComponent, { static: false }) previewComment: PreviewCommentComponent;

	sample$: Observable<Sample>;
	sampleDescriptor: SampleDescriptor;
	formConfig = new DynamicFormConfig({ mode: 'editable-text', alignValue: 'right' });
	selectedIndex = 0;
	modalOpen = false;
	erm = ERM;

	fieldDefinitions$: Observable<ExtendedFieldDefinition[]>;

	constructor(
		private commentSrv: CommentService,
		private router: Router,
		private userSrv: UserService,
		private sampleSrv: SampleService,
		private previewSrv: PreviewService,
		private dlgCommonSrv: DialogCommonService,
		private extendedFieldDefSrv: ExtendedFieldDefinitionService,
		private apiSrv: ApiService
	) {
		super();
	}

	ngOnInit() {
		this.sampleDescriptor = new SampleDescriptor([
			'reference',
			'name',
			'price',
			'assignee',
			'paid',
		]);
		this.sampleDescriptor.modify([
			{ name: 'name', label: 'sample-name' },
			{ name: 'price', label: 'sample-price' },
		]);

		this.fieldDefinitions$ = this.extendedFieldDefSrv.queryMany({
			query: 'target == "sample.extendedFields"',
			sortBy: 'order',
		});
	}

	ngOnChanges() {
		// this.sample$ = this.sampleSrv.selectOne(this._sample.id);
		// this.sample$.pipe(takeUntil(this._destroy$)).subscribe((s) => (this._sample = s));
	}

	// UPDATES
	update(value: any, prop: string) {
		this.sampleSrv.update({ id: this._sample.id, [prop]: value }).subscribe();
	}

	updateSample(sample: Sample) {
		this.sampleSrv.update({ id: this._sample.id, ...sample }).subscribe();
	}

	addComment(comment: Comment) {
		// // if we don't specify the user, when we get out of the preview and then comeback, the info displayed will be without the user info
		// const commentUser = { ...comment, createdBy: this.userSrv.userSync };
		// const comments = [...(this._sample.comments || [])];
		// comments.push(commentUser as any);
		// this.commentSrv
		// 	.create(comment)
		// 	.pipe(switchMap((_) => this.sampleSrv.update({ id: this._sample.id, comments })))
		// 	.subscribe();
	}

	delete(sample: Sample) {
		const text = `Are you sure you want to delete this sample ?`;
		this.dlgCommonSrv
			.openConfirmDlg({ text })
			.data$.pipe(switchMap((_) => this.apiSrv.delete('Sample', sample)))
			.subscribe((_) => this.close.emit());
	}

	archive() {
		const text = `Are you sure you want to archive this sample ?`;
		const action = 'archive';
		this.dlgCommonSrv.openConfirmDlg({ text, action }).data$.subscribe((_) => {
			this.update(true, 'archived');
			this.close.emit();
		});
	}

	// ACTIONS
	openSupplier() {
		// this.router.navigate(['suppliers', this.sample.supplier.id]);
	}

	openProduct() {
		// this.router.navigate(['products', this.sample.product.id]);
	}

	getProductFormatedName(product: Product) {
		if (!product) return;
		else if (product.name && product.reference) return product.reference + ' - ' + product.name;
		else if (product.name) return product.name;
		else if (product.reference) return product.reference;
	}

	// TAB SELECTION
	selectFirstTab() {
		this.previewSrv.onSelectedTab(1);
	}

	selectSecondTab() {
		this.previewSrv.onSelectedTab(2);
		this.previewComment.focus();
	}
}

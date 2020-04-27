import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { SampleDescriptor } from '~core/descriptors';
import {
	Comment,
	CommentService,
	ERM,
	ExtendedFieldDefinition,
	Product,
	UserService,
} from '~core/erm';
import { Sample } from '~core/erm3/models';
import { ListHelperService } from '~core/list-page2';
import { DynamicFormConfig } from '~shared/dynamic-forms/models/dynamic-form-config.interface';
import { PreviewCommentComponent, PreviewService } from '~shared/preview';
import { AutoUnsub } from '~utils';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ApiService } from '~core/erm3/services/api.service';
import { descriptorMock } from '~common/dialogs/creation-dialogs/product-creation-dialog/_temporary-descriptor-product.mock';

@Component({
	selector: 'sample-preview-app',
	templateUrl: './sample-preview.component.html',
	styleUrls: ['./sample-preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SamplePreviewComponent extends AutoUnsub implements OnInit {
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
	selectedIndex = 0;
	modalOpen = false;
	erm = ERM;
	descriptor = descriptorMock;

	constructor(
		private listHelper: ListHelperService,
		private commentSrv: CommentService,
		private userSrv: UserService,
		private previewSrv: PreviewService,
		private dlgCommonSrv: DialogCommonService,
		private apiSrv: ApiService
	) {
		super();
	}

	ngOnInit() {

		// this.fieldDefinitions$ = this.extendedFieldDefSrv.queryMany({ query: 'target == "sample.extendedFields"', sortBy: 'order' });
	}

	// UPDATES
	update(value: any, prop: string) {
		this.updateSample({ [prop]: value });
	}

	updateSample(sample: Sample) {
		const newSample = { ...sample, id: this.sample.id };
		this.listHelper.update(newSample);
		this._sample = newSample;
	}

	addComment(comment: Comment) {
		// if we don't specify the user, when we get out of the preview and then comeback, the info displayed will be without the user info
		const commentUser = { ...comment, createdBy: this.userSrv.userSync };
		const comments = [...(this._sample.comments || [])];
		comments.push(commentUser as any);
		this.commentSrv
			.create(comment)
			.pipe(tap((_) => this.listHelper.update({ id: this._sample.id, comments })))
			.subscribe();
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

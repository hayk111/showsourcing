import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { GroupedActivityFeed } from '~common/activity/interfaces/client-feed.interfaces';
import { GetStreamGroup } from '~common/activity/interfaces/get-stream-feed.interfaces';
import { TemplateService } from '~core/template/services/template.service';
import { SupplierService } from '~entity-services';
import { ERMService } from '~entity-services/_global/erm.service';
import { ProductService } from '~entity-services/product/product.service';
import { EntityName, ERM, Product, Supplier } from '~models';
import { RatingService } from '~shared/rating/services/rating.service';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'grouped-feed-list-app',
	templateUrl: './grouped-feed-list.component.html',
	styleUrls: ['./grouped-feed-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupedFeedListComponent extends AutoUnsub implements OnInit {

	ermSupplier = ERM.SUPPLIER;
	ermProduct = ERM.PRODUCT;

	previewOpen = false;
	productPreview: Product;

	@Input() feedResult: GroupedActivityFeed;
	@Output() openPreview = new EventEmitter<any>();

	constructor(
		private ermSrv: ERMService,
		private productSrv: ProductService,
		private supplierSrv: SupplierService,
		private templateSrv: TemplateService,
		private ratingSrv: RatingService,
	) {
		super();
	}

	ngOnInit() {
		// when we reach the bottom of the ** PAGE ** then we load more.
		this.templateSrv.bottomReached$.subscribe(_ => this.loadMore());
	}

	loadMore() {
		this.feedResult.loadMore();
	}

	updateProduct(product: Product) {
		this.productSrv.update(product).subscribe();
	}

	updateSupplier(supplier: Supplier) {
		this.supplierSrv.update(supplier).subscribe();
	}

	createComment(evt: { comment: any, entity: any, erm: any }) {
		this.ermSrv.getGlobalService(evt.erm).update({
			id: evt.entity.id,
			comments: [...evt.entity.comments, evt.comment]
		}).subscribe();
	}

	onThumbUp(product) {
		const votes = this.ratingSrv.thumbUp(product, EntityName.PRODUCT);
		this.updateProduct({ id: product.id, votes });
	}

	onThumbDown(product) {
		const votes = this.ratingSrv.thumbDown(product, EntityName.PRODUCT);
		this.updateProduct({ id: product.id, votes });
	}

	openProductPreview(product: Product) {
		this.previewOpen = true;
		this.productPreview = product;
	}

	closeProductPreview() {
		this.previewOpen = false;
	}

	getGroupName(feed: GetStreamGroup) {
		const group = feed.group;
		const manyActivities = feed.activities.length > 1;

		if (group.startsWith('product_activity'))
			return 'product_activity';
		if (group.startsWith('supplier_activity'))
			return 'supplier_activity';
		if (group.startsWith('create_product'))
			return manyActivities ? 'product_many_created' : 'product_one_created';
		if (group.startsWith('create_supplier'))
			return manyActivities ? 'supplier_many_created' : 'supplier_one_created';
	}
}

/*
Using in :
- dashboard

*/

import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { SupplierService, UserService } from '~entity-services';
import { ERMService } from '~entity-services/_global/erm.service';
import { CommentService } from '~entity-services/comment/comment.service';
import { ProductService } from '~entity-services/product/product.service';
import { Comment, Product, Supplier } from '~models';
import { GroupedActivityFeed } from '~common/activity/interfaces/client-feed.interfaces';
import { GetStreamGroup } from '~common/activity/interfaces/get-stream-feed.interfaces';
import { ThumbService } from '~shared/rating/services/thumbs.service';
import { TemplateService } from '~core/template/services/template.service';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'grouped-feed-list-app',
	templateUrl: './grouped-feed-list.component.html',
	styleUrls: ['./grouped-feed-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupedFeedListComponent extends AutoUnsub implements OnInit {

	@Input() feedResult: GroupedActivityFeed;

	constructor(
		private ermSrv: ERMService,
		private productSrv: ProductService,
		private supplierSrv: SupplierService,
		private templateSrv: TemplateService,
		private thumbSrv: ThumbService,
		private userSrv: UserService
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

	createComment(items: any) {
		const newComment = new Comment({ text: items.text });
		this.ermSrv.getGlobalService(items.typeEntity).update(
			// we do ...newComment, createdBy since we need the firstName, lastName, avatar... and the audith just provides the id
			{
				id: items.entity.id,
				comments: [
					...items.entity.comments,
					{ ...newComment, createdBy: this.userSrv.userSync, lastUpdatedBy: this.userSrv.userSync }
				]
			}
		).subscribe();
	}

	onThumbUp(product) {
		const votes = this.thumbSrv.thumbUp(product);
		this.updateProduct({ id: product.id, votes });
	}

	onThumbDown(product) {
		const votes = this.thumbSrv.thumbDown(product);
		this.updateProduct({ id: product.id, votes });
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
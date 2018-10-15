import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { Product, Project, Attachment, TeamUser, AppImage, ProductVoteRequest, User } from '~models';

import { ProductService, ProjectService, TeamUserService, UserService, SupplierService } from '~global-services';
import { SelectParams } from '~global-services/_global/select-params';
import { Sort } from '~shared/table/components/sort.interface';
import { ProductVoteRequestService } from '~global-services/product-vote-request/product-vote-request.service';
import { Apollo } from 'apollo-angular';
import { SupplierQueries } from '~global-services/supplier/supplier.queries';
import { ApolloStateService } from '~shared/apollo';

@Injectable()
export class ProductFeatureService extends ProductService {

	constructor(
		protected apolloState: ApolloStateService,
		private supplierSrv: SupplierService,
		protected userSrv: UserService
	) {
		super(apolloState, userSrv);
	}

	getContacts(supplierId: string) {
		return this.supplierSrv.queryOne(supplierId, SupplierQueries.contacts);
	}


	/** update the product */
	updateProduct(product: any, fields?: string) {
		this
			.update({ id: product.id, ...product }, fields)
			.subscribe();
	}

	/** when a new image is uploaded we add it to the list of images of the product */
	onNewImages(product: Product, imgs: AppImage[]) {
		this
			.update({
				id: product.id,
				images: [...product.images, ...imgs]
			})
			.subscribe();
	}

	/** when image is deleted */
	onImageDeleted(product: Product, img: AppImage) {
		const images = product.images.filter(image => image.id !== img.id);
		this.updateProduct({ images });
	}

	/** when file has been removed we remove link */
	onFileRemoved(product: Product, attachment: Attachment) {
		const attachments = product.attachments.filter(
			atc => atc.id !== attachment.id
		);
		this.updateProduct({ attachments });
	}

}

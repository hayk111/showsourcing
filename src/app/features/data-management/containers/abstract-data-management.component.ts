import { CommonDialogService } from '~common/dialog/services/common-dialog.service';
import { SelectionWithFavoriteService } from '~core/list-page/selection-with-favorite.service';
import { GlobalServiceInterface } from '~entity-services/_global/global.service';
import { EntityMetadata } from '~models';
import { TrackingComponent } from '~utils/tracking-component';
import { SelectionService } from '~core/list-page';

export abstract class AbstractDataManagementComponent extends TrackingComponent {

	constructor(
		protected selectionSrv: SelectionService,
		protected commonDlgSrv: CommonDialogService,
		public entityMetadata: EntityMetadata
	) {
		super();
	}

	mergeSelected() {
		const items = Array.from(this.selectionSrv.getSelectionIds());
		this.commonDlgSrv.openMergeDialog({
			type: this.entityMetadata,
			entities: items
		});
	}

}

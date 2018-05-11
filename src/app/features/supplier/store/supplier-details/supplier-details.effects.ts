import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { SupplierDetailActionType } from './supplier-details.action';
import { map ,  mergeMap, tap } from 'rxjs/operators';
import { ContactActions } from '~app/features/supplier/store/contacts/contact.actions';
import { LatestProductActions } from '~app/features/supplier/store/latest-product/latest-product.action';
import { fromTask } from '~app/entity/store/task/task.bundle';
import { fromImage } from '~app/entity/store/image/image.bundle';
import { fromFile } from '~app/entity/store/file/file.bundle';
import { ERM } from '~app/entity/store/entity.model';
import { FocusedEntityService } from '~app/shared/focused-entity/focused-entity.service';
import { CommentActions } from '~app/features/comment/store/comment';


@Injectable()
export class SupplierDetailsEffects {

	@Effect()
	focus$ = this.actions$.ofType<any>(SupplierDetailActionType.FOCUS).pipe(
		map(action => action.payload),
		map(id => ({ entityId: id, entityRepr: ERM.supplier })),
		// saving into focusSrv so the file effects know which entity is in focus
		tap(target => this.focusSrv.target = target),
		mergeMap(target => [
			CommentActions.load(),
			fromFile.Actions.loadForSelection(),
			fromImage.Actions.loadForSelection(),
			fromTask.Actions.loadForSelection(),
			LatestProductActions.load(),
			ContactActions.load()
		])
	);

	constructor(private actions$: Actions, private focusSrv: FocusedEntityService) { }
}

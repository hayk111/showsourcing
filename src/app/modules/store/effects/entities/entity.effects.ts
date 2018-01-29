import { Actions, Effect } from '@ngrx/effects';
import { TagActions } from '../../action/entities/tag.action';
import { TypedAction } from '../../utils/typed-action.interface';
import { ProductActions } from '../../action/entities/product.action';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { ProjectActions } from '../../action/entities/project.action';
import { EventActions } from '../../action/entities/event.action';
import { SupplierActions } from '../../action/entities/supplier.action';
import { CategoryActions } from '../../action/entities/category.action';
import { Entity, EntityRepresentation, entityRepresentationMap, EntityTarget } from '../../utils/entities.utils';
import Log from '../../../../utils/logger/log.class';
import { EntityService } from '../../services/entity.service';
import { ActionType } from '../../action/misc/entity-bridge.action';
import { SelectionService } from '../../services/selection.service';
import { CommentActions } from '../../action/entities/comment.action';
import { FileActions } from '../../action/entities/file.action';
import { ImageActions } from '../../action/entities/images.action';
import { TaskActions } from '../../action/entities/task.action';


export class EntityMapperEffects {

	constructor(private actions$: Actions, private srv: EntityService, private selectionSrv: SelectionService) {
		Log.debug('[EntityService] starting');
	}

	// Listen for the patch action and sends a patch request to backend
	@Effect()
	patch$ = this.actions$.ofType(ActionType.PATCH).pipe(
		map((action: TypedAction<any>) => action.payload),
		switchMap(
			(p: any) => this.srv.sendPatchRequest(p),
			(p: any) => this.mapPatch(p)
		)
	);

	@Effect()
	delete$ = this.actions$.ofType(ActionType.DELETE).pipe(
		map((action: any) => action.payload),
		switchMap(
			(target: EntityTarget) => this.srv.deleteItem(target),
			(target: EntityTarget) => this.mapDelete(target)
		)
	);

	@Effect()
	loadForTarget$ = this.actions$.ofType(ActionType.LOAD_FOR_SELECTION).pipe(
		map((action: TypedAction<any>) => action.payload),
		switchMap(
			(p: { toLoad: any, target: any}) => this.srv.loadForTarget(p.toLoad, p.target),
			((p: any, r: any) => [
			  this.mapAdd(p, r),
        this.mapAddRelation(p, r)
      ])
		)
	);


	mapPatch({target, propName, value}: { target: EntityTarget, propName: string, value: any }) {
		const m = entityRepresentationMap;
		switch (target.entityRepr.entityName) {

			case m.product.entityName :
				return ProductActions.patch(target.entityId, propName, value);

			case m.events.entityName:
				return EventActions.patch(target.entityId, propName, value);

			case m.suppliers.entityName:
				return SupplierActions.patch(target.entityId, propName, value);

			case m.projects.entityName:
				return ProjectActions.patch(target.entityId, propName, value);

			case m.categories.entityName:
				return CategoryActions.patch(target.entityId, propName, value);

			case m.tags.entityName:
				return TagActions.patch(target.entityId, propName, value);
		}
	}

	mapDelete(target: EntityTarget) {
		const m = entityRepresentationMap;
		switch (target.entityRepr.entityName) {

			case m.product.entityName :
				return ProductActions.delete(target.entityId);

			case m.events.entityName:
				return EventActions.delete(target.entityId);

			case m.suppliers.entityName:
				return SupplierActions.delete(target.entityId);

			case m.projects.entityName:
				return ProjectActions.delete(target.entityId);

			case m.categories.entityName:
				return CategoryActions.delete(target.entityId);

			case m.tags.entityName:
				return TagActions.delete(target.entityId);
		}
	}

	mapLoadForTarget(repr: EntityRepresentation, result: Array<Entity>) {
		const m = entityRepresentationMap;
		switch (repr.entityName) {

			case m.comments.entityName :
				 // return CommentActions.add(result);

			case m.files.entityName:
				return FileActions.add(result);

			case m.images.entityName:
				// return ImageActions.add(result);

			// those are already preloaded so no need to add
			case m.tags.entityName:
			case m.projects.entityName:
				return undefined;

			case m.tasks.entityName:
				// return TaskActions.add(result);
		}
	}

}


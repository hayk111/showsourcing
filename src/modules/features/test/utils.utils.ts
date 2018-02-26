import { Observable } from 'rxjs/Observable';
import { filter, map } from 'rxjs/operators';
import { selectProducts } from '~products';
import { Entity, entityRepresentationMap, EntityState, EntityTarget } from '~store/utils/entities.utils';

export function getFirstProductEntityTarget(store, takeUntil): Observable<EntityTarget> {
	// we select a product then we load images for it
	return store
		.select(selectProducts)
		.takeUntil(takeUntil)
		.pipe(
			filter((prods: EntityState<any>) => !prods.pending),
			map((prods: EntityState<any>) => {
				const firstId = prods.ids[0];
				return prods.byId[firstId];
			}),
			map((prod: Entity) => ({ entityId: prod.id, entityRepr: entityRepresentationMap.product }))
		);
}

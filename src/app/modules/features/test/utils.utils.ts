import { ProductActions } from '../../store/action/entities/index';
import { selectProducts } from '../../store/selectors/entities/products.selector';
import { filter, map, tap } from 'rxjs/operators';
import { Product } from '../../store/model/entities/product.model';
import { EntityState, Entity, entityRepresentationMap, EntityTarget } from '../../store/utils/entities.utils';
import { Observable } from 'rxjs/Observable';



export function getFirstProductEntityTarget(store, takeUntil): Observable<EntityTarget> {
	// we select a product then we load images for it
	return store.select(selectProducts)
		.takeUntil(takeUntil)
		.pipe(
			filter((prods: EntityState<any>) => !prods.pending),
			map((prods: EntityState<any>)  => {
				const firstId = prods.ids[0];
				return prods.byId[firstId];
			}),
			map((prod: Entity) => ({entityId: prod.id, entityRepr: entityRepresentationMap.product})),
		);
}

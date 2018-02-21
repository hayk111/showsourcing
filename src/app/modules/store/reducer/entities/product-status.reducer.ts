import { ProductStatus } from '../../../products/models/product.model';
import { EntityState, Entity } from '../../utils/entities.utils';

const initialState: EntityState<Entity> = {
	pending: false,
	byId: {
		Idea: { id: 'Idea', name: ProductStatus.IDEA },
		NeedReview: { id: 'NeedReview', name: ProductStatus.NEED_REVIEW },
		UnderAssessment: { id: 'UnderAssessment', name: ProductStatus.UNDER_ASSESSMENT },
		Complete: { id: 'Complete', name: ProductStatus.COMPLETE },
		Refused: { id: 'Refused', name: ProductStatus.REFUSED },
		CustomStatus: { id: 'CustomStatus', name: 'Custom' }
	},
	ids: ['Idea', 'NeedReview', 'UnderAssessment', 'Complete', 'Refused']
};

// we are doing a filter for product status for convenience for the filter panel
export function productStatusReducer(state = initialState, action) {
	return state;
}

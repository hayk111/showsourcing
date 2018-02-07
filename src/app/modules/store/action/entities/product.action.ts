import { Action } from '@ngrx/store';
import { Product } from '../../model/entities/product.model';
import { TypedAction } from '../../utils/typed-action.interface';
import { AppComment } from '../../model/entities/comment.model';
import { FilterGroupName } from '../../model/misc/filter.model';
import { AppFile } from '../../model/entities/app-file.model';
import { Tag } from '../../model/entities/tag.model';
import { Project } from '../../model/entities/project.model';
import { Task } from '../../model/entities/task.model';
import { Patch } from '../../utils/patch.interface';
import {  addActionType, makeBasicActionTypes, makeBasicActions } from './_entity.action.factory';
import { entityRepresentationMap } from '../../utils/entities.utils';

// keeping capitalization for backward compatibility
export const ActionType = makeBasicActionTypes(entityRepresentationMap.product);
addActionType(ActionType, entityRepresentationMap.product, 'REQUEST_PDF');
export const ProductActions: any = makeBasicActions(ActionType);

ProductActions.requestPdf = (id: string) =>  {
	return {
		type: ActionType.REQUEST_PDF,
		payload: id
	};
};


entityRepresentationMap.product.actions = ProductActions;

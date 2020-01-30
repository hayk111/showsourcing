import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { first, take } from 'rxjs/operators';
import { ERMService } from '~entity-services/_global/erm.service';
import { EntityMetadata, RPCActionTypes, RPCRequestStatus } from '~models';
import { RpcService } from '~core/ORM/services';

@Injectable({
	providedIn: 'root'
})
export class CrudDialogService {

	constructor(
		private ermService: ERMService,
		private rpcSrv: RpcService) { }

	create(item: FormGroup, type: EntityMetadata) {
		const name = item.value.name;
		const entity = new type.constClass({ name });
		return this.ermService.getGlobalService(type).create(entity);
	}

	edit(item: FormGroup, type: EntityMetadata, entity: any) {
		const name = item.value.name;
		return this.ermService.getGlobalService(type).update({ id: entity.id, name });
	}

	merge(item: any, type: EntityMetadata, entities: Array<any>): Observable<any> {
		const ids = entities.map(entity => entity.id);
		const payload = {
			margeInto: item.id,
			target: ids,
		};
		return this.rpcSrv.createRPC({
			action: RPCActionTypes['MERGE_' + type.singular.toUpperCase()],
			payload: JSON.stringify(payload)
		});
	}

	checkExists(type: EntityMetadata, valueInput: string) {
		return this.ermService.getGlobalService(type)
			.queryOneByPredicate(`name == "${valueInput.trim()}"`, ['id', 'name'])
			.pipe(take(1));
	}
}



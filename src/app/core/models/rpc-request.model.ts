import { ID, uuid } from '~utils';

export enum RPCRequestStatus {
	PENDING = 'pending',
	PROCESSING = 'processing',
	READY = 'ready',
	ERROR = 'error'
}

export enum RPCActionTypes {
	MERGE_CATEGORY = 'MERGE_CATEGORY',
	MERGE_TAG = 'MERGE_TAG',
	MERGE_EVENT = 'MERGE_EVENT',
	MERGE_SUPPLIER = 'MERGE_SUPPLIER',
	GET_TEAM_STATS = 'GET_TEAM_STATS'
}

export interface IRPCRequest {
	id?: ID;
	action: RPCActionTypes;
	payload?: string;
	reply?: string;
	status?: RPCRequestStatus;
}

export class RPCRequest implements IRPCRequest {
	public id: ID;
	public action: RPCActionTypes;
	public reply?: string;
	public payload: string;
	public status: RPCRequestStatus;
	public creationDate = '' + new Date();
	public lastUpdatedDate = '' + new Date();
	public deleted = false;

	constructor(req: IRPCRequest) {
		this.id = req.id ? req.id : uuid();
		this.action = req.action;
		this.payload = req.payload ? req.payload : JSON.stringify({});
		this.status = req.status ? req.status : RPCRequestStatus.PENDING;
	}

}



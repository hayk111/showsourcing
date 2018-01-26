import Log from '../../../../utils/logger/log.class';


export const selectSuppliers = state => {
	Log.debug('selecting suppliers');
	return state.entities.suppliers;
};

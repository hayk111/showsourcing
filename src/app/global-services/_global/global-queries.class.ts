import gql from 'graphql-tag';

/**
 * When the query builder builds a query it needs a set of fields to create
 * the query. The fields used can be passed in the selectOne(id, fields) method
 * of the Global Service. However a service can have default for
 * one, many, all, update and create.
 *
 * When extending this class for example do this:
 *
 * class ProductQueries extends GlobalQueries {
 *   one = `name, price`;
 *   static oneWithPicture = `name, images {id, filename}`
 * }
 *
 * selectOne(id) // will return name and price
 * selectOne(id, ProductQueries.oneWithPicture) // will return name, images {id, filename}
 * you can even concatenate queries:
 * selectOne(id, [ProductQueries.one, ProductQueries.oneWithPicture])
 */
export abstract class GlobalQueries {
	static one = 'name';
	static many = 'name';
	static all = 'name';
	static update = '';
	static create = '';
}

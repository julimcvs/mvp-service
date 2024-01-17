import { Type } from '@sinclair/typebox';

export default class ProductSchema {
    findPaginate = {
        query: Type.Object({
            page: Type.Integer(),
            rowsPerPage: Type.Integer(),
            sortField: Type.Optional(Type.String()),
            sortDirection: Type.Optional(Type.String())
        })
    };
}
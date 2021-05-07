import * as Mutations from "./mutations";
import * as Queries from "./queries";

export const getMutation = (model, type) => {
    model = model.toUpperCase();
    type = type.toUpperCase();
    return Mutations[`${type}_${model}_MUTATION`];
};

export const getQuery = (model) => {
    model = model.toUpperCase();
    return Queries[`FETCH_${model}_QUERY`];
};

export * from "./mutations";
export * from "./queries";

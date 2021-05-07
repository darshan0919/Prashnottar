export * from "./answer";
export * from "./comment";
export * from "./generated";
export * from "./post";
export * from "./reply";
export * from "./user";

/*export const getMutationType = (model, type) => {
    model = model.charAt(0).toUpperCase() + model.slice(1);
    type = type.charAt(0).toUpperCase() + type.slice(1);
    console.log();
    return Types[`${type}${model}Mutation`];
};

export const getMutationVariablesType = (model, type) => {
    model = model.charAt(0).toUpperCase() + model.slice(1);
    type = type.charAt(0).toUpperCase() + type.slice(1);
    return Types[`${type}${model}MutationVariables`];
};

export const getQueryType = (model) => {
    model = model.charAt(0).toUpperCase() + model.slice(1);
    return Types[`${model}Query`];
};

export const getQueryVariablesType = (model) => {
    model = model.charAt(0).toUpperCase() + model.slice(1);
    return Types[`{model}QueryVariables`];
};*/

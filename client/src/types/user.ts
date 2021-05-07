type Maybe<T> = T | null;

export type User = {
    __typename?: "User";
    id: string;
    username: string;
    photo: string;
};

export type UserSnippetFragment = Pick<User, "id">;

export type UserQueryVariables = Pick<User, "id">;
export type UserQuery = { __typename?: "Query" } & {
    getUser?: Maybe<{ __typename?: "User" } & User>;
};

export type UserLoginInput = {
    username: string;
    password: string;
};

export type LoginUserMutationVariables = UserLoginInput;
///TODO
export type LoginUserMutation = { __typename?: "Mutation" } & {
    login: any;
};

export type UserRegisterInput = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export type RegisterUserMutationVariables = UserRegisterInput;
///TODO
export type RegisterUserMutation = { __typename?: "Mutation" } & {
    register: any;
};

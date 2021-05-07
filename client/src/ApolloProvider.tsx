import React from "react";
import App from "./App";
import {
    ApolloProvider,
    ApolloClient,
    HttpLink,
    ApolloLink,
    InMemoryCache,
    concat,
} from "@apollo/client";

const httpLink = new HttpLink({ uri: "http://localhost:5000/" });

const authMiddleware = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem("jwtToken");
    operation.setContext({
        headers: {
            Authorization: token ? `Bearer ${token}` : null,
        },
    });

    return forward(operation);
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(authMiddleware, httpLink),
});

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);

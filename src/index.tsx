import React from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { Listings } from "./sections";

const GRAPHQL_URL = `/api`;
const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Listings title="Tinyhouse Listings" />
    </ApolloProvider>
    ,
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

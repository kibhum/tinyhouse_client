import React, { useState, useEffect, useRef } from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  useMutation,
} from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Affix, Layout, Spin } from "antd";
import reportWebVitals from "./reportWebVitals";
import { Viewer } from "./lib/types";
import { LOG_IN } from "./lib/graphql/mutations";
import {
  LogIn as LogInData,
  LogInVariables,
} from "./lib/graphql/mutations/LogIn/__generated__/LogIn";
import {
  Home,
  Host,
  Listing,
  Listings,
  NotFound,
  User,
  Login,
  AppHeader,
} from "./sections";
import { AppHeaderSkeleton, ErrorBanner } from "./lib/components";
import "./styles/index.css";

const GRAPHQL_URL = `/api`;

const token = sessionStorage.getItem("token");
const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
  headers: {
    "X-CSRF-TOKEN": token || " ",
  },
});

const initialViewer: Viewer = {
  id: null,
  avatar: null,
  token: null,
  hasWallet: null,
  didRequest: false,
};

const App = () => {
  const [viewer, setViewer] = useState<Viewer>(initialViewer);
  const [logIn, { error }] = useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: (data) => {
      if (data && data.logIn) {
        setViewer(data.logIn);
        if (data.logIn.token) {
          sessionStorage.setItem("token", data.logIn.token);
        } else {
          sessionStorage.removeItem("token");
        }
      }
    },
  });
  const logInRef = useRef(logIn);

  useEffect(() => {
    logInRef.current();
  }, []);

  if (!viewer.didRequest && !error) {
    return (
      <Layout className="app-skeleton">
        <AppHeaderSkeleton />;
        <div className="app-skeleton__spin-section">
          <Spin size="large" tip="Launching TinyhouseHkk" />
        </div>
      </Layout>
    );
  }
  const logInErrorBannerElement = error ? (
    <ErrorBanner description="We weren't able to verify if you were logged in. Please try again later!" />
  ) : null;

  return (
    <Router>
      <Layout id="app">
        {logInErrorBannerElement}
        <Affix offsetTop={0} className="app__affix-header">
          <AppHeader viewer={viewer} setViewer={setViewer} />
        </Affix>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/host" element={<Host />} />
          <Route path="/listing/:id" element={<Listing />} />
          <Route path="/listings/:location?" element={<Listings />} />
          <Route path="/login" element={<Login setViewer={setViewer} />} />
          <Route path="/user/:id" element={<User viewer={viewer} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

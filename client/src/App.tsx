import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Route exact path="/home" component={Home} />
                <AuthRoute exact path="/" component={Login} />
                <AuthRoute exact path="/register" component={Register} />
                <Route exact path="/posts/:postId" component={SinglePost} />
            </Router>
        </AuthProvider>
    );
}

export default App;

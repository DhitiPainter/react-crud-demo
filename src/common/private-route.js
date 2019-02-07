import React, { Component } from "react";
import { Route, Redirect } from 'react-router-dom';

export function PrivateRoute({ component: Component, path, render, isAuthenticated, ...rest }) {
    if (isAuthenticated) {
        return (
            <Route render={props => (<Component {...rest} {...props} />)}></Route>
        );
    } else {
        return (
            <Route render={props => (<Redirect to={{ pathname: path }} {...props} />)}></Route>
        );
    }
}

export default PrivateRoute;
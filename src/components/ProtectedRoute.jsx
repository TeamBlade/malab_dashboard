import { Children } from "react";
import { getUserState } from "../state/user"
import { Redirect } from 'react-router-dom'
import React from "react";
export default function ProtectedRoute({ ...props }) {
    const { chilren: children, ...rest } = props
    const userState = getUserState();
    if (userState.isLoggedIn && userState.isAdmin)
        return children
    else
        return
            <Redirect to='/login'></Redirect>

}
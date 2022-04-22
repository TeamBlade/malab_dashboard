import { Children } from "react";
import { getUserState } from "../state/user"
import { Redirect } from 'react-router-dom'
import React from "react";
export default function ProtectedRoute({ ...props }) {
    const { chilren: children, ...rest } = props
    const isAdmin = getUserState().isAdmin;
    if (!isAdmin)
        return <Redirect to='/login' />
    return <children/>

}
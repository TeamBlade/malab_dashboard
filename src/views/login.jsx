import TextField from '@material-ui/core/TextField';
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { login } from "../api/users"
import { withStyles } from '@material-ui/core/styles';
import { setUserState } from '../state/user';
import { ItemGrid } from "components"
import { Grid } from 'material-ui';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import App from 'views/Dashboard/Dashboard'
const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

function Login({ ...props }) {
    const { show, classes, saveClick } = props
    const history = useHistory()
    const { control, handleSubmit, register } = useForm({
        defaultValues: {
            email: 'admin@admin.com',
            password: '11223344'
        }
    });
    const onSubmit = data => {
        login(data).then(res => {
            if (res) {
                console.log(res.token)
                setUserState({
                    id: res.id,
                    email: res.email,
                    type: res.type,
                    loggedIn: true,
                    firstName: res.firstNamem,
                    lastName: res.lastName,
                    isAdmin: res.type === "admin",
                    token: res.token
                })
                App
                history.push('/')
            }
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container style={{ width: "50%", margin: "auto", bacground: "white" }}>
                    <ItemGrid sx={12} md={12}>
                        <input type='text' ref={register} name='email' />
                        <input type='password' ref={register} name='password' />

                    </ItemGrid>
                    <ItemGrid sx={12} md={12}>

                        <input type="submit" value="تسجيل الدخول" />
                    </ItemGrid>
                </Grid>
            </form>
        </div>
    )
}

export default withStyles(styles)(Login);
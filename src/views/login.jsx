import { withStyles } from '@material-ui/core/styles';
import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import { login } from "../api/users";
import { setUserState } from '../state/user';
import './login.css';
const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
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
            email: '',
            password: ''
        }
    });
    const onSubmit = data => {
        login(data).then(res => {
            if (res) {
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
                history.push('/')

            }
        }).catch(e => { })
    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit(onSubmit)} id='login-form'>
                <input type='text' ref={register} name='email' />
                <input type='password' ref={register} name='password' />
                <input type="submit" value="تسجيل الدخول" />
            </form>
        </div>
    )
}

export default withStyles(styles)(Login);
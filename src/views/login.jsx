import { withStyles } from '@material-ui/core/styles';
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import { login } from "../api/users";
import { setUserState } from '../state/user';
import './login.css';
import 'bootstrap/dist/css/bootstrap.rtl.min.css'
import img from 'assets/img/_8.jpg'
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
    body: {
        backgroundImage: img,

    }


});
const loginStyles = {
    backgroundImage: "url(" + img + ")",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '100vh',
    width: '100vw',
    paddingLeft: 'calc(50vw - 120px)',
    paddingRight: 'calc(50vw - 120px)',
    paddingTop: 'calc(50vh - 180px)'
}
function Login({ ...props }) {
    const { show, classes, saveClick } = props
    const history = useHistory()
    const { control, handleSubmit, register } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });
    const [invalidLogin, setInvalidLogin] = useState(false)
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
        }).catch(e => {
            setInvalidLogin(true)
        })
    }

    return (
        <div div style={loginStyles}
            dir='rtl'>
            <form onSubmit={handleSubmit(onSubmit)} id='login-form'>
                <div className='form-group'>
                    <label htmlFor='username'>إسم المستحدم</label>
                    <input type='text' id='username' className='form-control' ref={register} name='email' />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'></label>
                    <input type='password' id='password' className='form-control' ref={register} name='password' />
                </div>
                {invalidLogin ? <span>كلمة المرور أو ‘سم المستخدم خطأ</span> : null}
                <input type="submit" className='btn btn-success' value="تسجيل الدخول" />
            </form>
        </div>
    )
}

export default withStyles(styles)(Login);
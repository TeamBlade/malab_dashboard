import { withStyles } from '@material-ui/core/styles';
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import { login } from "../api/users";
import { setUserState } from '../state/user';
import './login.css';
import img from 'assets/img/_8.jpg'
import { useFormik } from 'formik';

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
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    backgroundPosition: 'center',
    backgroundSize: 'cover'

}
function Login({ ...props }) {
    const { show, classes, saveClick } = props
    const history = useHistory()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate: (values, props) => {
            const errors = {}
            if (!values.email)
                errors.email = 'Required'
            if (!values.password)
                errors.password = 'Required'
            return errors
        },
        onSubmit: (values) => onSubmit(values)
    });
    const [invalidLogin, setInvalidLogin] = useState(false)
    const onSubmit = data => {
        login(data).then(res => {
            if (Object.prototype.toString.call(res) === '[object Object]') {
                setUserState({
                    id: res.id,
                    email: res.email,
                    type: res.type,
                    loggedIn: true,
                    firstName: res.firstName,
                    lastName: res.lastName,
                    isAdmin: res.type === "admin",
                    token: res.token
                })
                history.push('/')

            } else {
                setInvalidLogin(true)
            }
        }).catch(e => {
            setInvalidLogin(true)
        })
    }

    return (
        <div style={loginStyles} id='login-page'>

            <form dir='rtl' onSubmit={formik.handleSubmit}>
                <h3>تسجيل الدخول</h3>

                <label htmlFor="username">إسم المستحدم</label>
                <input type="text" placeholder="إسم المستخدم" id="username" name='email' onChange={formik.handleChange} />
                <label htmlFor="password">كلمة المرور</label>
                <input type="password" placeholder="كلمة المرور" id="password" name="password" onChange={formik.handleChange} />
                {(invalidLogin || formik.errors.email || formik.errors.password) && (formik.touched.email && formik.touched.password) ? <span>كلمة المرور أو ‘سم المستخدم خطأ</span> : null}

                <button type='submit'>تسجيل الدخول</button>
            </form>
        </div>
    )
}

export default withStyles(styles)(Login);
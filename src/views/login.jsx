import TextField from '@material-ui/core/TextField';
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { login } from "../api/users"
import { withStyles } from '@material-ui/core/styles';
import { setUserState } from '../state/user';
import { ItemGrid } from "components"
import { Grid } from 'material-ui';

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

    const { control, handleSubmit } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });
    const onSubmit = data => {
        login(data).then(res => {
            if (res) {
                console.log(res.token)
                setUserState({
                    email: res.email,
                    isAdmin: res.type === "admin", token: res.token
                })
            }
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container style={{width: "50%", margin: "auto", bacground: "white"}}>
                    <ItemGrid sx={12} md={12}>

                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => <TextField
                                id="email"
                                fullWidth={true}
                                label="البريد الإلكتروني"
                                {...field}
                                type="email"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />}
                        />
                    </ItemGrid>
                    <ItemGrid sx={12} md={12}>
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => <TextField
                                id="password"
                                fullWidth={true}
                                label="كلمة السر"
                                {...field}
                                type="password"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />}
                        />
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
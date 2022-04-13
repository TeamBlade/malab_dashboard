import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { getPlaygroundsDropdown } from "../../api/playgrounds";
import { createBooking } from '../../api/booking';

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

function ReservationForm({ ...props }) {
    const { show, classes, saveClick } = props
    const { control, handleSubmit } = useForm({
        defaultValues: {
            startTime: "07:30",
            endTime: "8:40",
            date: '2017-05-24',
            playground: {}
        }
    });
    const onSubmit = data => {
        data.playground = data.playground.value;
        createBooking(data).then(

        )
    }

    const [playgrounds, setPlaygrounds] = useState([]);
    useEffect(() => {
        getPlaygroundsDropdown()
            .then(data => {
                console.log("resf", data)
                setPlaygrounds(data)
            })
    }, [])

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>

                <Controller
                    name="playground"
                    control={control}
                    render={({ field }) => <Select
                        {...field}
                        options={playgrounds}
                    />}
                />


                <Controller
                    name="startTime"
                    control={control}
                    render={({ field }) =>  <TextField
                    id="date"
                    label="التاريخ"
                    {...field}
                    type="date"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />}
                />

                <Controller
                    name="startTime"
                    control={control}
                    render={({ field }) => <TextField
                        id="time"
                        label="وقت البداية"
                        {...field}
                        type="time"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 300, // 5 min
                        }}
                    />}
                />

                <Controller
                    name="endTime"
                    control={control}
                    render={({ field }) => <TextField
                        id="time"
                        label="وقت النهاية"
                        {...field}
                        type="time"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 300, // 5 min
                        }}
                    />}
                />


                <input type="submit" />
            </form>
        </div>
    )
}

export default withStyles(styles)(ReservationForm);
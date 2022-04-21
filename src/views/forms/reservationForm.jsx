import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { getPlaygroundsDropdown } from "../../api/playgrounds";
import { createBooking, getAllBooking } from '../../api/booking';
import { RHFInput } from 'react-hook-form-input';

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
    
    const [tableRows, setTableRows] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
  
    const fetchData = () => {
      getAllBooking().then(data => (data));
    }
  
    useEffect(() => {
      fetchData()
    }, [])
  
    
    const { control, handleSubmit, register, setValue } = useForm({
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

            <RHFInput
                  as={ <Select
                        options={playgrounds}
                    />}
                    rules={{ required: true }}
                    name="playground"
                    register={register}
                    setValue={setValue} />


                <RHFInput
                    as={<TextField
                        id="date"
                        label="التاريخ"
                        type="date"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />}
                    rules={{ required: true }}
                    name="date"
                    register={register}
                    setValue={setValue} />

                <RHFInput
                    as={<TextField
                        id="time"
                        label="وقت البداية"
                        type="time"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 60, // 5 min
                        }}
                    />}
                    rules={{ required: true }}
                    name="startTime"
                    register={register}
                    setValue={setValue} />

                <RHFInput
                    as={<TextField
                        id="time"
                        label="وقت النهاية"
                        type="time"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 60, // 5 min
                        }}
                    />}
                    rules={{ required: true }}
                    name="endTime"
                    register={register}
                    setValue={setValue} />


                <input type="submit" />
            </form>
        </div>
    )
}

export default withStyles(styles)(ReservationForm);
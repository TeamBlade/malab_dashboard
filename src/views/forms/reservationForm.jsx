import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { ItemGrid } from "components";
import { Button, Grid, withStyles } from 'material-ui';
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RHFInput } from 'react-hook-form-input';
import Select from 'react-select';
import { createBooking } from "../../api/booking";
import { getPlaygroundsDropdown } from '../../api/playgrounds';

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
    const { classes, forUpdate, data, handleClose, refreshTable } = props
    const [playgrounds, setplaygrounds] = useState([]);

    useEffect(() => {
        getPlaygroundsDropdown().then(data => setplaygrounds(data))
    }, [])
    const defaultValues = data || {
        playground: '',
        startTime: '',
        endTime: '',
        date: '',
    }

    const { control, setValue, register, handleSubmit } = useForm({
        defaultValues,
        shouldUnregister: false
    });
    const resetForm = () => {
        const fieldsNames = ['playground', 'startTime', 'endTime', 'date', 'id']
        fieldsNames.forEach(field => setValue(field, ''))
    }

    const onSubmit = data => {
        data.playground = data.playground.value
        createBooking(data).then(res => {
            resetForm()
            refreshTable()
            handleClose()
        })
    }


    return (
        <Dialog
            dir="rtl"
            fullWidth
            maxWidth="md"
            open={true}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle id="form-dialog-title">{forUpdate ? "تعديل بيانات صاحب الملعب" : "إضافة صاحب مفعب جديد"}</DialogTitle>
                <DialogContent>
                    <Grid container>
                        <ItemGrid sx={12} md={4}>

                            <RHFInput
                                as={<Select
                                    options={playgrounds}
                                />}
                                rules={{ required: true }}
                                name="playground"
                                register={register}
                                setValue={setValue} />
                        </ItemGrid>
                        <ItemGrid sx={12} md={4}>


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
                        </ItemGrid>
                        <ItemGrid sx={12} md={4}>

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
                        </ItemGrid>
                        <ItemGrid sx={12} md={4}>

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
                        </ItemGrid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        إلغاء
                    </Button>
                    <Button type="submit" color="primary">
                        حفظ
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default withStyles(styles)(ReservationForm);
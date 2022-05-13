import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import { useFormik } from 'formik';
import { withStyles } from 'material-ui';
import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { createBooking } from "../../api/booking";
import { getPlaygroundsDropdown } from '../../api/playgrounds';
import './forms.css';


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
    const { forUpdate, data, handleClose, refreshTable } = props
    const [playgrounds, setplaygrounds] = useState([]);
    useEffect(() => {
        getPlaygroundsDropdown().then(data => setplaygrounds(data))
    }, [])

    const [selectedPlayground, setSelectedPlayground] = useState('')
    let defaultValues = data || {
        playground: '',
        startTime: '',
        endTime: '',
        date: '',
    }
    const onSubmit = data => {
        if (forUpdate) {

        } else {
            let _data = data
            _data.playground = data.playground.value
            createBooking(_data).then(res => {
                refreshTable();
                handleClose()
            })
        }
    }

    const validate = (values, props) => {
        const errors = {}
        if (!values.playground)
            errors.playground = 'Required'
        if (!values.startTime)
            errors.startTime = 'Required'
        if (!values.endTime)
            errors.endTime = 'Required'
        if (!values.date)
            errors.date = 'Required'
        console.log(errors, values)
        return errors;
    }
    const formik = useFormik({
        validate,
        initialValues: defaultValues,
        onSubmit: values => {
            onSubmit(values)
        },
    });
    return (
        <Dialog
            dir="rtl"
            fullWidth
            maxWidth="md"
            open={true}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle id="form-dialog-title">{forUpdate ? "تعديل بيانات الحجز" : "إضافة حجز جديد"}</DialogTitle>
                <DialogContent>
                    <div className='row'>
                        <div className='col-md-6 col-sm-12'>
                            <div className='form-group'>
                                <label htmlFor='playground'>الملعب</label>
                                <Select
                                    id='playground'
                                    name='playground'
                                    className='form-select'
                                    options={playgrounds}
                                    onChange={selectedOption => {
                                        formik.setFieldValue("playground", selectedOption)
                                    }
                                    }
                                    value={formik.values.playground}
                                />
                                {formik.errors.playground && formik.touched.playground ? <span>هذا الحقل مطلوب</span> : null}

                            </div>
                        </div>

                        <div className='col-md-6 col-sm-12'>

                            <div className='form-group'>
                                <label htmlFor="date">التاريخ</label>
                                <input
                                    id="date"
                                    name="date"
                                    type="date"
                                    className='form-control'

                                    onChange={formik.handleChange}
                                    value={formik.values.date}
                                />
                                {formik.errors.date && formik.touched.date ? <span>هذا الحقل مطلوب</span> : null}

                            </div>
                        </div>

                        <div className='col-md-6 col-sm-12'>

                            <div className='form-group'>

                                <label htmlFor="startTime">وقت البداية</label>
                                <input
                                    id="startTime"
                                    name="startTime"
                                    type="time"
                                    className='form-control'
                                    onChange={formik.handleChange}
                                    value={formik.values.startTime}
                                />
                                {formik.errors.startTIme && formik.touched.startTIme ? <span>هذا الحقل مطلوب</span> : null}

                            </div>
                        </div>

                        <div className='col-md-6 col-sm-12'>

                            <div className='form-group'>

                                <label htmlFor="endTime">وقت الإنتهاء</label>
                                <input
                                    id="endTime"
                                    name="endTime"
                                    type="time"
                                    className='form-control'
                                    onChange={formik.handleChange}
                                    value={formik.values.endTime}
                                />
                                {formik.errors.endTime && formik.touched.endTime ? <span>هذا الحقل مطلوب</span> : null}

                            </div>
                        </div>
                    </div>

                </DialogContent>
                <DialogActions>
                    <button className='btn btn-outline me-4' onClick={handleClose}>
                        إلغاء
                    </button>
                    <button className='btn btn-primary' type="submit">
                        حفظ
                    </button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default withStyles(styles)(ReservationForm);
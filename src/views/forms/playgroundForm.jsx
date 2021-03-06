import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { ItemGrid } from "components";
import { Button, Grid } from "material-ui";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { RHFInput } from 'react-hook-form-input';
import Select from "react-select";
import { createPlayground, updatePlayground } from "../../api/playgrounds";
import { getServiceDropdown } from '../../api/services';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import './forms.css'
import { useFormik } from 'formik';
import * as yup from 'yup';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

function PlaygroundForm({ ...props }) {
    const { classes, forUpdate, data, handleClose, refreshTable } = props


    const [services, setServices] = useState([]);
    useEffect(() => {
        getServiceDropdown().then(data => (setServices(data)))
    }, [])


    const [selectedImages, setselectedImages] = useState([]);
    const [selectedService, setSelectedService] = useState('')
    const defaultValues = data || {
        name: '',
        description: '',
        dayStartTime: '',
        dayEndTime: '',
        nightStartTime: '',
        nightEndTime: '',
        services: '',
        city: "",
        price: 0,
        type: ''

    }
    const onSubmit = _data => {
        const formData = new FormData();
        for (const key of Object.keys(selectedImages))
            formData.append("images", selectedImages[key]);
        formData.append("name", _data.name)
        formData.append("description", _data.description)
        formData.append("services", JSON.stringify(_data.services.map(s => s.value)))
        formData.append("city", _data.city)
        formData.append("price", _data.price)

        formData.append("location", JSON.stringify({
            latitude: 24.7241504,
            longitude: 46.2620616,
            address: 'riadh'
        }))
        formData.append("type", _data.type)
        if (forUpdate) {
            formData.append("id", _data["id"])
            formData.append("dayShift", JSON.stringify({
                id: data.dayShift._id,
                start: _data.dayStartTime,
                end: _data.dayEndTime
            }))
            formData.append("nightShift", JSON.stringify({
                id: data.nightShift._id,
                start: _data.nightStartTime,
                end: _data.nightEndTime
            }))
            updatePlayground(formData).then(res => {
                refreshTable()
                handleClose()
            }).catch(e => {
                handleClose()
            })
        }
        else {
            formData.append("dayShift", JSON.stringify({
                start: _data.dayStartTime,
                end: _data.dayEndTime
            }))
            formData.append("nightShift", JSON.stringify({
                start: _data.nightStartTime,
                end: _data.nightEndTime
            }))
            createPlayground(formData).then(res => {
                console.log('play', res)
                refreshTable()
                handleClose()
            })
        }

    }

    const validate = (values, props) => {
        const errors = {}
        if (!values.name)
            errors.name = 'Required'
        if (!values.description)
            errors.description = 'Required'
        if (!values.dayStartTime)
            errors.dayStartTime = 'Required'
        if (!values.name)
            errors.name = 'Required'
        if (!values.dayEndTime)
            errors.dayEndTime = 'Required'
        if (!values.nightStartTime)
            errors.nightStartTime = 'Required'
        if (!values.nightEndTime)
            errors.nightEndTime = 'Required'
        if (!values.services)
            errors.services = 'Required'
        if (!values.city)
            errors.city = 'Required'
        if (!values.price)
            errors.price = 'Required'
        if (!values.type)
            errors.type = 'Required'
        if (!selectedImages)
            errors.images = 'Required'
        console.log(values.services)
        return errors
    }
    const formik = useFormik({
        validate: validate,
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
                <DialogTitle id="form-dialog-title">{forUpdate ? "?????????? ???????????? ????????????" : "?????????? ???????? ????????"}</DialogTitle>
                <DialogContent>
                    <div className="row">
                        <div className='col-md-6 col-sm-12'>
                            <div className="form-group">
                                <label htmlFor="name">?????? ????????????</label>
                                <input type="text"
                                    name='name'
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                    className="form-control" id="name" placeholder="?????? ????????????" />
                                {formik.errors.name && formik.touched.nmae && <span>?????? ?????????? ??????????</span>}
                            </div>
                        </div>
                        <div className='col-md-6 col-sm-12'>
                            <div className="form-group">
                                <label htmlFor="description">??????????</label>
                                <input type="text"
                                    name='description'
                                    onChange={formik.handleChange}
                                    value={formik.values.description}
                                    className="form-control" id="description" placeholder="??????????" />
                                {formik.errors.description && formik.touched.description && <span>?????? ?????????? ??????????</span>}
                            </div>
                        </div>

                        <div className='col-md-6 col-sm-12'>
                            <div className='form-group'>
                                <label htmlFor="services">??????????????</label>
                                <Select
                                    isMulti
                                    name='services'
                                    options={services}
                                    onChange={selectedOption => {
                                        setSelectedService(selectedOption)
                                        const list = selectedOption.map(m => m.value)
                                        formik.setFieldValue("services", selectedOption)
                                    }
                                    }
                                    value={formik.values.services}
                                />
                                {formik.errors.services && formik.touched.services && <span>?????? ?????????? ??????????</span>}

                            </div>
                        </div>

                        <div className='col-md-6 col-sm-12'>

                            <div className="d-flex flex-column">
                                <span>???????? ????????????</span>
                                <input
                                    type="file"
                                    name='images'
                                    className='form-control hidden'
                                    id="imageUpload"
                                    multiple='multiple'
                                    onChange={(e) => {
                                        console.log(e.target.files)
                                        setselectedImages(e.target.files)
                                    }}
                                />
                                <label htmlFor='imageUpload' className='btn btn-info'>???????? ?????? ????????</label>
                            </div>


                        </div>

                        <div className='col-md-6 col-sm-12'>
                            <div className="form-group">
                                <label htmlFor="city">??????????????</label>
                                <input type="text"
                                    name='city'
                                    onChange={formik.handleChange}
                                    value={formik.values.city}
                                    className="form-control" id="city" placeholder="??????????????" />
                                {formik.errors.city && formik.touched.city && <span>?????? ?????????? ??????????</span>}
                            </div>
                        </div>

                        <div className='col-md-6 col-sm-12'>
                            <div className="form-group">
                                <label htmlFor="price">??????????</label>
                                <input type="text"
                                    name='price'
                                    onChange={formik.handleChange}
                                    value={formik.values.price}
                                    className="form-control" id="price" placeholder="??????????" />
                                {formik.errors.price && formik.touched.price && <span>?????? ?????????? ??????????</span>}
                            </div>
                        </div>

                        <div className='col-md-6 col-sm-12'>
                            <div className="form-group">
                                <label htmlFor="type">??????????</label>
                                <input type="text"
                                    name='type'
                                    onChange={formik.handleChange}
                                    value={formik.values.type}
                                    className="form-control" id="type" placeholde="??????????" />
                                {formik.errors.type && formik.touched.type && <span>?????? ?????????? ??????????</span>}
                            </div>
                        </div>

                        <div className="col-md-6 col-sm-12">
                            <div className="form-group">
                                <label htmlFor="dayStartTime">?????? ?????????? ?????????????? ????????????????</label>
                                <input type="time"
                                    name='dayStartTime'
                                    onChange={formik.handleChange}
                                    value={formik.values.dayStartTime}
                                    className="form-control" id="dayStartTime" placeholder="?????? ?????????? ?????????????? ????????????????" />
                                {formik.errors.dayStartTime && formik.touched.dayStartTime && <span>?????? ?????????? ??????????</span>}
                            </div>
                        </div>

                        <div className='col-md-6 col-sm-12'>
                            <div className="form-group">
                                <label htmlFor="dayEndTime">?????? ???????????? ?????????????? ????????????????</label>
                                <input type="time"
                                    name='dayEndTime'
                                    onChange={formik.handleChange}
                                    value={formik.values.dayEndTime}
                                    className="form-control" id="dayEndTime" placeholder="?????? ???????????? ?????????????? ????????????????" />
                                {formik.errors.dayEndTime && formik.touched.dayEndTime && <span>?????? ?????????? ??????????</span>}
                            </div>
                        </div>

                        <div className='col-md-6 col-sm-12'>
                            <div className="form-group">
                                <label htmlFor="nightStartTime">?????? ?????????? ?????????????? ????????????????</label>
                                <input type="time"
                                    name='nightStartTime'
                                    onChange={formik.handleChange}
                                    value={formik.values.nightStartTime}
                                    className="form-control" id="nightStartTime" placeholder="?????? ?????????? ?????????????? ????????????????" />
                                {formik.errors.nightStartTime && formik.touched.nightStartTime && <span>?????? ?????????? ??????????</span>}
                            </div>
                        </div>


                        <div className='col-md-6 col-sm-12'>
                            <div className="form-group">
                                <label htmlFor="nightEndTime">?????? ?????????? ?????????????? ????????????????</label>
                                <input type="time"
                                    name='nightEndTime'
                                    onChange={formik.handleChange}
                                    value={formik.values.nightEndTime}
                                    className="form-control" id="nightEndTime" placeholder="?????? ?????????? ?????????????? ????????????????" />
                                {formik.errors.nightEndTime && formik.touched.nightEndTime && <span>?????? ?????????? ??????????</span>}
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <button className='btn btn-outline me-4' onClick={handleClose}>
                        ??????????
                    </button>
                    <button className='btn btn-primary' type="submit">
                        ??????
                    </button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default withStyles(styles)(PlaygroundForm);
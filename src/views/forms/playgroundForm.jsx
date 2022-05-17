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
                <DialogTitle id="form-dialog-title">{forUpdate ? "تعديل بيانات الملعب" : "إضافة ملعب جديد"}</DialogTitle>
                <DialogContent>
                    <div className="row">
                        <div className='col-md-6 col-sm-12'>
                            <div className="form-group">
                                <label htmlFor="name">إسم الملعب</label>
                                <input type="text"
                                    name='name'
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                    className="form-control" id="name" placeholder="إسم الملعب" />
                                {formik.errors.name && formik.touched.nmae && <span>هذا الحقل مطلوب</span>}
                            </div>
                        </div>
                        <div className='col-md-6 col-sm-12'>
                            <div className="form-group">
                                <label htmlFor="description">الوصف</label>
                                <input type="text"
                                    name='description'
                                    onChange={formik.handleChange}
                                    value={formik.values.description}
                                    className="form-control" id="description" placeholder="الوصف" />
                                {formik.errors.description && formik.touched.description && <span>هذا الحقل مطلوب</span>}
                            </div>
                        </div>

                        <div className='col-md-6 col-sm-12'>
                            <div className='form-group'>
                                <label htmlFor="services">الخدمات</label>
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
                                {formik.errors.services && formik.touched.services && <span>هذا الحقل مطلوب</span>}

                            </div>
                        </div>

                        <div className='col-md-6 col-sm-12'>

                            <div className="d-flex flex-column">
                                <span>صورة الملعب</span>
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
                                <label htmlFor='imageUpload' className='btn btn-info'>إختر ملف صورة</label>
                            </div>


                        </div>

                        <div className='col-md-6 col-sm-12'>
                            <div className="form-group">
                                <label htmlFor="city">المدينة</label>
                                <input type="text"
                                    name='city'
                                    onChange={formik.handleChange}
                                    value={formik.values.city}
                                    className="form-control" id="city" placeholder="المدينة" />
                                {formik.errors.city && formik.touched.city && <span>هذا الحقل مطلوب</span>}
                            </div>
                        </div>

                        <div className='col-md-6 col-sm-12'>
                            <div className="form-group">
                                <label htmlFor="price">السعر</label>
                                <input type="text"
                                    name='price'
                                    onChange={formik.handleChange}
                                    value={formik.values.price}
                                    className="form-control" id="price" placeholder="السعر" />
                                {formik.errors.price && formik.touched.price && <span>هذا الحقل مطلوب</span>}
                            </div>
                        </div>

                        <div className='col-md-6 col-sm-12'>
                            <div className="form-group">
                                <label htmlFor="type">النوع</label>
                                <input type="text"
                                    name='type'
                                    onChange={formik.handleChange}
                                    value={formik.values.type}
                                    className="form-control" id="type" placeholde="النوع" />
                                {formik.errors.type && formik.touched.type && <span>هذا الحقل مطلوب</span>}
                            </div>
                        </div>

                        <div className="col-md-6 col-sm-12">
                            <div className="form-group">
                                <label htmlFor="dayStartTime">زمن بداية الوردية النهارية</label>
                                <input type="time"
                                    name='dayStartTime'
                                    onChange={formik.handleChange}
                                    value={formik.values.dayStartTime}
                                    className="form-control" id="dayStartTime" placeholder="زمن بداية الوردية النهارية" />
                                {formik.errors.dayStartTime && formik.touched.dayStartTime && <span>هذا الحقل مطلوب</span>}
                            </div>
                        </div>

                        <div className='col-md-6 col-sm-12'>
                            <div className="form-group">
                                <label htmlFor="dayEndTime">زمن إنتهاء الوردية النهارية</label>
                                <input type="time"
                                    name='dayEndTime'
                                    onChange={formik.handleChange}
                                    value={formik.values.dayEndTime}
                                    className="form-control" id="dayEndTime" placeholder="زمن إنتهاء الوردية النهارية" />
                                {formik.errors.dayEndTime && formik.touched.dayEndTime && <span>هذا الحقل مطلوب</span>}
                            </div>
                        </div>

                        <div className='col-md-6 col-sm-12'>
                            <div className="form-group">
                                <label htmlFor="nightStartTime">زمن بداية الوردية المسائية</label>
                                <input type="time"
                                    name='nightStartTime'
                                    onChange={formik.handleChange}
                                    value={formik.values.nightStartTime}
                                    className="form-control" id="nightStartTime" placeholder="زمن بداية الوردية المسائية" />
                                {formik.errors.nightStartTime && formik.touched.nightStartTime && <span>هذا الحقل مطلوب</span>}
                            </div>
                        </div>


                        <div className='col-md-6 col-sm-12'>
                            <div className="form-group">
                                <label htmlFor="nightEndTime">زمن نهاية الوردية المسائية</label>
                                <input type="time"
                                    name='nightEndTime'
                                    onChange={formik.handleChange}
                                    value={formik.values.nightEndTime}
                                    className="form-control" id="nightEndTime" placeholder="زمن نهاية الوردية المسائية" />
                                {formik.errors.nightEndTime && formik.touched.nightEndTime && <span>هذا الحقل مطلوب</span>}
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

export default withStyles(styles)(PlaygroundForm);
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


    const [formData, setFormData] = useState(null);
    if (forUpdate) {

        data.dayStartTime = data.dayShift.start;
        data.dayEndTime = data.dayShift.end;
        data.nighStartTime = data.nightShift.start;
        data.nightEndTime = data.nightShift.end;
        data.services = data.services/*  */.map(x => ({ label: x.name, value: x._id }))
    }
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
    const { control, setValue, register, handleSubmit } = useForm({
        defaultValues,
        shouldUnregister: false
    });

    const resetForm = () => {

        const fieldsNames = [
            'name',
            'description',
            'dayStartTime',
            'dayEndTime',
            'nightStartTime',
            'nightEndTime',
            'services',
            'city',
            'price',
            'type'
        ]
        fieldsNames.forEach(field => setValue(field, ''))
    }

    const onSubmit = _data => {
        console.log('forupdate', forUpdate)
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
            formData.append("id", _data["_id"])
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
                resetForm()
                handleClose()
            }).catch(e => console.log(e))
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
                refreshTable()
                resetForm()
                handleClose()
            })
        }

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
                <DialogTitle id="form-dialog-title">{forUpdate ? "تعديل بيانات الملعب" : "إضافة ملعب جديد"}</DialogTitle>
                <DialogContent>
                    <div className="row">
                        <div className='col-md-6 col-sm-12'>
                            <RHFInput
                                as={<div className="form-group">
                                    <label htmlFor="name">إسم الملعب</label>
                                    <input type="text" className="form-control" id="name" placeholder="إسم الملعب" />
                                </div>}
                                rules={{ required: true }}
                                name="name"
                                register={register}
                                setValue={setValue} />
                        </div>
                        <div className='col-md-6 col-sm-12'>
                            <RHFInput
                                as={<div className="form-group">
                                    <label htmlFor="description">الوصف</label>
                                    <input type="text" className="form-control" id="description" placeholder="الوصف" />
                                </div>}
                                rules={{ required: true }}
                                name="description"
                                register={register}
                                setValue={setValue} />
                        </div>

                        <div className='col-md-6 col-sm-12'>
                            <RHFInput
                                as={<Select
                                    isMulti
                                    options={services}
                                />}
                                style={{ width: '100px' }}
                                rules={{ required: true }}
                                name="services"
                                register={register}
                                setValue={setValue} />
                        </div>

                        <div className='col-md-6 col-sm-12'>
                            <Controller
                                name="images"
                                control={control}
                                render={({ field }) => <input
                                    type="file"
                                    multiple='multiple'
                                    onChange={(e) => { ; setselectedImages(e.target.files) }}

                                />}
                            />
                        </div>

                        <div className='col-md-6 col-sm-12'>
                            <RHFInput
                                as={<div className="form-group">
                                    <label htmlFor="city">المدينة</label>
                                    <input type="text" className="form-control" id="city" placeholder="الإسم الأول" />
                                </div>}
                                rules={{ required: true }}
                                name="city"
                                register={register}
                                setValue={setValue} />
                        </div>

                        <div className='col-md-6 col-sm-12'>
                            <RHFInput
                                as={<div className="form-group">
                                    <label htmlFor="price">السعر</label>
                                    <input type="text" className="form-control" id="price" placeholder="السعر" />
                                </div>}
                                rules={{ required: true }}
                                name="price"
                                register={register}
                                setValue={setValue} />
                        </div>

                        <div className='col-md-6 col-sm-12'>
                            <RHFInput
                                as={<div className="form-group">
                                    <label htmlFor="type">النوع</label>
                                    <input type="text" className="form-control" id="type" placeholde="النوع" />
                                </div>}
                                rules={{ required: true }}
                                name="type"
                                register={register}
                                setValue={setValue} />
                        </div>

                        <div className="col-md-6 col-sm-12">
                            <RHFInput
                                as={<div className="form-group">
                                    <label htmlFor="dayStartTime">زمن بداية الوردية النهارية</label>
                                    <input type="time" className="form-control" id="dayStartTime" placeholder="زمن بداية الوردية النهارية" />
                                </div>}
                                rules={{ required: true }}
                                name="dayStartTime"
                                register={register}
                                setValue={setValue} />
                        </div>

                        <div className='col-md-6 col-sm-12'>
                            <RHFInput
                                as={<div className="form-group">
                                    <label htmlFor="dayEndTime">زمن إنتهاء الوردية النهارية</label>
                                    <input type="time" className="form-control" id="dayEndTime" placeholder="زمن إنتهاء الوردية النهارية" />
                                </div>}
                                rules={{ required: true }}
                                name="dayEndTime"
                                register={register}
                                setValue={setValue} />
                        </div>

                        <div className='col-md-6 col-sm-12'>
                            <RHFInput
                                as={<div className="form-group">
                                    <label htmlFor="nightStatTime">زمن بداية الوردية المسائية</label>
                                    <input type="time" className="form-control" id="nightStatTime" placeholder="زمن بداية الوردية المسائية" />
                                </div>}
                                rules={{ required: true }}
                                name="nightStartTime"
                                register={register}
                                setValue={setValue} />
                        </div>


                        <div className='col-md-6 col-sm-12'>
                            <RHFInput
                                as={<div className="form-group">
                                    <label htmlFor="nightEndTime">زمن نهاية الوردية المسائية</label>
                                    <input type="time" className="form-control" id="nightEndTime" placeholder="زمن نهاية الوردية المسائية" />
                                </div>}
                                rules={{ required: true }}
                                name="nightEndTime"
                                register={register}
                                setValue={setValue} />
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
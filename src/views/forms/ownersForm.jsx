import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { ItemGrid } from "components";
import { Button, Grid } from "material-ui";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { RHFInput } from 'react-hook-form-input';
import { addUser, updateUser } from "../../api/admin";
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
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



function OwnersForm(props) {
  const { forUpdate, refreshTable, data, classes, handleClose } = props;

  const [selectedRow, setSelectedRow] = useState(null);

  // form
  const [initalFormData, setInitialFormData] = useState(null);
  const defaultValues = data || {
    firstName: '',
    lastName: '',
    city: '',
    email: '',
    phone: '',
    image: '',
    type: 'user',
    password: '',
    id: ''
  }
  const { control, setValue, register, handleSubmit, formState: { errors } } = useForm({
    defaultValues,
    shouldUnregister: false
  });
  const resetForm = () => {

    const fieldsNames = [
      'firstName', 'lastName', 'city',
      'email',
      'phone',
      'image',
      'type',
      'password',
      'id']
    fieldsNames.forEach(field => setValue(field, ''))
    setValue('type', 'user')
  }
  const onSubmit = data => {
    const formData = new FormData();

    formData.append("image", selectedRow);
    formData.append("firstName", data.firstName)
    formData.append("lastName", data.lastName)
    formData.append("city", data.city)
    formData.append("phone", data.phone)

    if (forUpdate) {
      formData.append("id", data["id"])
      updateUser(formData).then(res => {
        refreshTable()
        handleClose()
      })
    }
    else {
      formData.append("type", "owner")
      formData.append("email", data.email)
      formData.append("password", data.password)
      addUser(formData).then(res => {
        refreshTable()
      })
    }
    setOpen(false)
    resetForm()
    handleClose()
  }

  const [open, setOpen] = useState(false);

  return (
    <Dialog
      dir="rtl"
      fullWidth
      maxWidth="md"
      open={true}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <form onSubmit={handleSubmit(onSubmit)} >
        <DialogTitle id="form-dialog-title">{forUpdate ? "تعديل بيانات صاحب الملعب" : "إضافة صاحب مفعب جديد"}</DialogTitle>
        <DialogContent>
          <div className='row'>
            <div className='col-md-6 col-sm-12'>
              <RHFInput
                as={
                  <div className="form-group">
                    <label htmlFor="firstName">الإسم الأول</label>
                    <input type="text" className="form-control" id="firstName" placeholder="الإسم الأول" />
                    {errors.firstName && <span>هذا الحقل مطلوب</span>}
                  </div>}
                rules={{ required: true }}
                name="firstName"
                register={register}
                setValue={setValue} />
            </div>
            <div className='col-md-6 col-sm-12'>
              <RHFInput
                as={<div className="form-group">
                  <label htmlFor="lastName">الإسم الأخير</label>
                  <input type="text" className="form-control" id="lastName" placeholder="الإسم الأخير" />
                  {errors.lastName && <span>هذا الحقل مطلوب</span>}
                </div>}
                rules={{ required: true }}
                name="lastName"
                register={register}
                setValue={setValue} />
            </div>
            <div className='col-md-6 col-sm-12'>
              <Controller
                name="image"
                control={control}
                render={({ field }) => <div className="form-group">
                  <input
                    type="file"
                    className='form-control hidden'
                    id="imageUpload"
                    onChange={(e) => setSelectedRow(e.target.files[0])}
                  />
                  <label htmlFor='imageUpload' className='btn btn-info'>إختر ملف صورة</label>
                </div>}
              />
            </div>
            <div className='col-md-6 col-sm-12'>
              <RHFInput
                as={<div className="form-group">
                  <label htmlFor="city">المدينة</label>
                  <input type="text" className="form-control" id="city" placeholder="المدينة" />
                  {errors.city && <span>هذا الحقل مطلوب</span>}

                </div>}
                rules={{ required: true }}
                name="city"
                register={register}
                setValue={setValue} />
            </div>
            <div className='col-md-6 col-sm-12'>
              <RHFInput
                as={<div className="form-group">
                  <label htmlFor="phone">رقم الهاتف</label>
                  <input type="text" className="form-control" id="phone" placeholder="رقم الهاتف" />
                  {errors.phone && <span>هذا الحقل مطلوب</span>}

                </div>}
                rules={{ required: true }}
                name="phone"
                register={register}
                setValue={setValue} />
            </div>
            <div className='col-md-6 col-sm-12'>
              <RHFInput
                as={<div className="form-group">
                  <label htmlFor="email">البريد الإلكتروني</label>
                  <input type="email" className="form-control" id="email" placeholder="البريد الإلكتروني" />
                  {errors.email && <span>هذا الحقل مطلوب</span>}

                </div>}
                rules={{ required: true }}
                name="email"
                register={register}
                setValue={setValue} />
            </div>
            {(!forUpdate) ?
              <div className='col-md-6 col-sm-12'>
                <RHFInput
                  as={<div className="form-group">
                    <label htmlFor="password">لمة المرور</label>
                    <input type="password" className="form-control" id="password" placeholder="كلمة المرور" />
                    {errors.password && <span>هذا الحقل مطلوب</span>}

                  </div>}
                  rules={{ required: true }}
                  name="password"
                  register={register}
                  setValue={setValue} />
              </div> : <div></div>
            }
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

export default withStyles(styles)(OwnersForm)
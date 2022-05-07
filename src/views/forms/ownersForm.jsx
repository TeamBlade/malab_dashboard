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
  const { control, setValue, register, handleSubmit } = useForm({
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
          <Grid container>

            <ItemGrid sx={12} md={4}>
              <RHFInput
                as={<TextField
                  id="firstName"
                  label="الإسم الأول"
                  type="text"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />}
                rules={{ required: true }}
                name="firstName"
                register={register}
                setValue={setValue} />
            </ItemGrid>
            <ItemGrid sx={12} md={4}>
              <RHFInput
                as={<TextField
                  id="lastName"
                  label="الإسم الثاني"
                  type="text"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />}
                rules={{ required: true }}
                name="lastName"
                register={register}
                setValue={setValue} />
            </ItemGrid>
            <ItemGrid sx={12} md={4}>
              <Controller
                name="image"
                control={control}
                render={({ field }) => <input
                  type="file"
                  onChange={(e) => setSelectedRow(e.target.files[0])}

                />}
              />
            </ItemGrid>
            <ItemGrid sx={12} md={4}>
              <RHFInput
                as={<TextField
                  id="city"
                  label="المدينة"
                  type="text"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />}
                rules={{ required: true }}
                name="city"
                register={register}
                setValue={setValue} />
            </ItemGrid>
            <ItemGrid sx={12} md={4}>
              <RHFInput
                as={<TextField
                  id="phone"
                  label="رقم الهاتف"
                  type="text"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />}
                rules={{ required: true }}
                name="phone"
                register={register}
                setValue={setValue} />
            </ItemGrid>
            <ItemGrid sx={12} md={4}>
              <RHFInput
                as={<TextField
                  id="email"
                  label="البريد الإلكتروني"
                  type="text"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />}
                rules={{ required: true }}
                name="email"
                register={register}
                setValue={setValue} />
            </ItemGrid>
            {(!forUpdate) ?
              <ItemGrid sx={12} md={4}>
                <RHFInput
                  as={<TextField
                    id="password"
                    label="كلمة السر"
                    type="password"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />}
                  rules={{ required: true }}
                  name="password"
                  register={register}
                  setValue={setValue} />
              </ItemGrid> : <div></div>
            }
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
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

export default withStyles(styles)(OwnersForm)
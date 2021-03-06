import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import { useFormik } from 'formik';
import React, { useState } from "react";
import * as yup from 'yup';
import { addUser, updateUser } from "../../api/admin";
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



function ClientForm(props) {
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
      formData.append("type", "user")
      formData.append("email", data.email)
      formData.append("password", data.password)
      addUser(formData).then(res => {
        refreshTable()
        handleClose()
      })
    }
    handleClose()
  }

  const validate = (values, props) => {
    const errors = {}
    if (!values.firstName)
      errors.firstName = 'Required'
    if (values.firstName && values.firstName.length < 3)
      errors.firstName = 'length'
    if (!values.lastName)
      errors.lastName = 'Required'
    if (values.lastName && values.lastName.length < 3)
      errors.lastName = 'length'
    if (!values.city)
      errors.city = 'Required'
    if (!values.email)
      errors.email = 'Required'
    if (!values.phone)
      errors.phone = 'Required'
    if (values.phone.length < 12)
      errors.phone = 'length'
    if (!values.password && !forUpdate)
      errors.password = 'Required'
    if (values.password && !forUpdate && values.password.length < 6)
      errors.password = 'length'
    if (!selectedRow)
      errors.image = 'Required'
    return errors
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
      <form onSubmit={formik.handleSubmit} >
        <DialogTitle id="form-dialog-title">{forUpdate ? "?????????? ???????????? ????????????" : "??????????  ???????? ????????"}</DialogTitle>
        <DialogContent>
          <div className='row'>
            <div className='col-md-6 col-sm-12'>
              <div className="form-group">
                <label htmlFor="firstName">?????????? ??????????</label>
                <input type="text"
                  name='firstName'
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                  className="form-control" id="firstName" placeholder="?????????? ??????????" />
                {formik.errors.firstName && formik.touched.firstName ? formik.errors.firstName == 'Required' ? <span>?????? ?????????? ??????????</span> : <span>?????? ?????????? ?????? ???? ???? ?????? ???? 3 ????????</span> : null}
              </div>
            </div>
            <div className='col-md-6 col-sm-12'>
              <div className="form-group">
                <label htmlFor="lastName">?????????? ????????????</label>
                <input type="text"
                  name='lastName'
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                  className="form-control" id="lastName" placeholder="?????????? ????????????" />
                {formik.errors.lastName && formik.touched.lastName ? formik.errors.lastName == 'Required' ? <span>?????? ?????????? ??????????</span> : <span>?????? ?????????? ?????? ???? ???? ?????? ???? 3 ????????</span> : null}

              </div>
            </div>
            <div className='col-md-6 col-sm-12'>
              <div className="d-flex flex-column">
                <span>???????? ????????????</span>
                <input
                  type="file"
                  name='image'
                  className='form-control hidden'
                  id="imageUpload"
                  onChange={(e) => {
                    e.preventDefault()
                    formik.setFieldValue('image', e.target.files[0].filename)
                    setSelectedRow(e.target.files[0])
                  }}
                />
                <label htmlFor='imageUpload' className='btn btn-info'>???????? ?????? ????????</label>
                {formik.errors.image && formik.touched.image ? <span>?????? ?????????? ??????????</span> : null}
              </div>

            </div>
            <div className='col-md-6 col-sm-12'>
              <div className="form-group">
                <label htmlFor="city">??????????????</label>
                <input type="text"
                  name='city'
                  onChange={formik.handleChange}
                  value={formik.values.city} className="form-control" id="city" placeholder="??????????????" />
                {formik.errors.city && formik.touched.city ? <span>?????? ?????????? ??????????</span> : null}

              </div>
            </div>
            <div className='col-md-6 col-sm-12'>
              <div className="form-group">
                <label htmlFor="phone">?????? ????????????</label>
                <input type="text"
                  name='phone'
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  className="form-control" id="phone" placeholder="?????? ????????????" />
                {formik.errors.phone && formik.touched.phone ? formik.errors.phone == 'Required' ? <span>?????? ?????????? ??????????</span> : <span>?????? ???????????? ?????? ???? ???? ?????? ???? 12 ????????</span> : null}

              </div>
            </div>
            <div className='col-md-6 col-sm-12'>
              <div className="form-group">
                <label htmlFor="email">???????????? ????????????????????</label>
                <input type="text"
                  name='email'
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className="form-control" id="email" placeholder="???????????? ????????????????????" />
                {formik.errors.email && formik.touched.email ? <span>?????? ?????????? ??????????</span> : null}

              </div>
            </div>
            {(!forUpdate) ?
              <div className='col-md-6 col-sm-12'>
                <div className="form-group">
                  <label htmlFor="password">???????? ????????????</label>
                  <input type="password"
                    name='password'
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    className="form-control" id="password" placeholder="???????? ????????????" />
                  {formik.errors.password && formik.touched.password ? formik.errors.password == 'Required' ? <span>?????? ?????????? ??????????</span> : <span>?????? ???????? ???????????? ?????? ???? ???? ?????? ???? 6 ????????</span> : null}

                </div>
              </div> : <div></div>
            }
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

export default withStyles(styles)(ClientForm)
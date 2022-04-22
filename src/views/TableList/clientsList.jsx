import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { ItemGrid, RegularCard, Table } from "components";
import { Button, Grid } from "material-ui";
import React from "react";
import { useEffect, useState } from 'react'
import { Controller, useForm } from "react-hook-form";
import { addUser, deleteUser, getAllUsers, updateUser } from "../../api/admin";
import { RHFInput } from 'react-hook-form-input';
import { Redirect } from 'react-router-dom'
import {getUserState} from '../../state/user'

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


function TableList(props) {
  const { classes } = props
  const [clientsList, setClientList] = useState([])
  const [tableRows, setTableRows] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const fetchData = (cancel) => {
    getAllUsers(pageNumber, pageSize, "user", cancel).then(data => {
      if (!data)
        data = []
      setClientList(data)
      const rows = data.map(v => [v.firstName + " " + v.lastName, v.phone, v.city, v.email,])
      console.log(rows);
      setTableRows(rows)
    })

  }

  useEffect(() => {
    const controller = new window.AbortController();
    fetchData(controller)
    return () =>{controller.abort()}
  }, [pageNumber])

  const refreshTable = () => {
    
    fetchData()
  }

  const [selectedRow, setSelectedRow] = useState(null);

  // form
  const [initalFormData, setInitialFormData] = useState(null);
  const defaultValues = initalFormData || {
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
      formData.append("id", initalFormData["id"])
      updateUser(formData).then(res => {
        refreshTable()
      })
    }
    else {
      formData.append("type", "user")
      formData.append("email", data.email)
      formData.append("password", data.password)
      addUser(formData).then(res => {
        refreshTable()
      })
    }
    setOpen(false)
    setForUpdate(false)
    resetForm()
  }

  const [open, setOpen] = useState(false);
  const [forUpdate, setForUpdate] = useState(false);

  const handleClose = () => {
    setOpen(false)
    resetForm()
  }
  const nextPage = () => {
    setPageNumber(pageNumber + 1)
  }

  const prevPage = () => {
    if (pageNumber > 1)
      setPageNumber(pageNumber - 1)
  }

  // Popluates the form with selected data
  useEffect(() => {
    let cancel = false
    if(!cancel)
    if (initalFormData !== null && initalFormData !== undefined) {
      setOpen(true)
      Object.keys(initalFormData).forEach(key => {
        setValue(key, initalFormData[key])
        setValue("type", "user")
      })
    }
    return () =>{cancel = true}

  }, [initalFormData])

  const handleEditClick = ({ prop, key }) => {
    const data = clientsList[key]
    setForUpdate(true)
    setInitialFormData(data)
  }

  const handleDeleteClick = ({ prop, key }) => {
    deleteUser(clientsList[key].id).then(
      res => {
        let list = tableRows.filter((_, i) => i !== key)
        setTableRows(list)

      }
    )
  }
  const isAdmin = getUserState().isAdmin;
  if (isAdmin)
    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <RegularCard
              cardTitle={
                <Grid container>

                  <ItemGrid xs={11} md={11}>
                    قائمه العملاء
                  </ItemGrid>
                  <ItemGrid xs={1} md={1}>
                    <Button color="primary" onClick={() => {
                      setOpen(true);
                    }}>Create</Button>
                  </ItemGrid>
                </Grid>
              }
              cardSubtitle="من الاحدث الي الاقدم"
              content={
                <Table
                  showEditButton={true}
                  showDeleteButton={false}
                  handleDeleteClick={handleDeleteClick}
                  handleEditClick={handleEditClick}
                  tableHeaderColor="primary"
                  tableHead={["اسم العميل", "رقم الهاتف", "المدينه", "الايميل"]}
                  tableData={tableRows}
                />
              }
            />
          </ItemGrid>
          <ItemGrid>
            <Button onClick={() => prevPage()}>الصفحة السابقة</Button>
            <Button onClick={() => nextPage()}>الصفحة التالية</Button>

          </ItemGrid>
        </Grid>
        <div id="dialog"></div>

        <Dialog
          dir="rtl"
          fullWidth
          maxWidth="md"
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <form onSubmit={handleSubmit(onSubmit)} >
            <DialogTitle id="form-dialog-title">{forUpdate ? "تعديل بيانات العميل" : "إضافة عميل جديد"}</DialogTitle>
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
              <Button onClick={handleClose} color="primary">
                إلغاء
              </Button>
              <Button type="submit" color="primary">
                حفظ
              </Button>
            </DialogActions>
          </form>
        </Dialog>

      </div>
    );
    else
    return (<Redirect from='/clients' to='/login'/>)
}

export default withStyles(styles)(TableList);
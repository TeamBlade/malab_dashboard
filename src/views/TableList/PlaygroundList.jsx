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
import { RHFInput } from 'react-hook-form-input';
import { getServiceDropdown } from "../../api/services"
import { createPlayground, deletePlayground, getAllPlaygrounds, getPlaygroundsByOwner, updatePlayground } from '../../api/playgrounds';
import Select from 'react-select';
import { getUserState } from '../../state/user';

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

const TableList = ({ ...props }) => {
  const { classes } = props

  const [playgroundsList, setPlaygroundlist] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const loadData = (data) => {
    if (!data)
      data = []
    let ref = 1;
    const rows = data.map(v => [`${ref++}`, v.name, v.city,])
    setTableRows(rows)
    setPlaygroundlist(data)
  }
  const fetchData = () => {
    if (getUserState().isAdmin)
      getAllPlaygrounds().then(data => {
        loadData(data)
      });
    else {
    getPlaygroundsByOwner(getUserState().id).then(data => loadData(data))
    }
  }


  useEffect(() => {
    fetchData()
  }, [])

  const [services, setServices] = useState([]);
  useEffect(() => {
    getServiceDropdown().then(data => (setServices(data)))
  }, [])

  const refreshTable = () => {
    fetchData()
  }

  const [selectedImages, setselectedImages] = useState(null);


  const [initalFormData, setInitialFormData] = useState(null);
  const defaultValues = {
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
    console.log(data)
    const formData = new FormData();
    for (const key of Object.keys(selectedImages))
      formData.append("images", selectedImages[key]);
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("services", JSON.stringify(data.services.map(s => s.value)))
    formData.append("city", data.city)
    formData.append("price", data.price)
    formData.append("dayShift", JSON.stringify({
      start: data.dayStartTime,
      end: data.dayEndTime
    }))
    formData.append("nightShift", JSON.stringify({
      start: data.nightStartTime,
      end: data.nightEndTime
    }))
    formData.append("location", JSON.stringify({
      latitude: 24.7241504,
      longitude: 46.2620616,
      address: 'riadh'
    }))
    formData.append("type", data.type)
    if (forUpdate) {
      formData.append("id", data["id"])
      updatePlayground(formData).then(res => {
        refreshTable()
      })
    }
    else {
      createPlayground(formData).then(res => {
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
    console.log(initalFormData)
    if (initalFormData !== null && initalFormData !== undefined) {
      setOpen(true)
      Object.keys(initalFormData).forEach(key => {
        setValue(key, initalFormData[key])
      })
      setValue("dayStartTime", initalFormData['dayShift']['start'])
      setValue("dayEndTime", initalFormData['dayShift']['end'])
      setValue("nightStartTime", initalFormData['nightShift']['start'])
      setValue("nightEndTime", initalFormData['nightShift']['end'])

    }
  }, [initalFormData])

  const handleEditClick = ({ prop, key }) => {
    const data = playgroundsList[key]
    setForUpdate(true)
    setInitialFormData(data)
  }

  const handleDeleteClick = ({ prop, key }) => {
    deletePlayground(playgroundsList[key].id).then(
      res => {
        let list = tableRows.filter((_, i) => i !== key)
        setTableRows(list)

      }
    )
  }

  return (
    <div>
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <RegularCard
            cardTitle={
              <Grid container>

                <ItemGrid xs={11} md={11}>

                  قائمه الملاعب

                </ItemGrid>
                <ItemGrid xs={1} md={1}>
                  <Button onClick={() => { setOpen(true) }}>Create</Button>
                </ItemGrid>
              </Grid>
            }
            cardSubtitle="من الاحدث الي الاقدم"
            content={
              <Table
                handleDeleteClick={handleDeleteClick}
                handleEditClick={handleEditClick}
                showDelete={getUserState().isAdmin}
                showEdit={getUserState().isAdmin}
                tableHeaderColor="primary"
                tableHead={["الرقم التعريفي	", "اسم الملعب	", "موقع الملعب	", "صاحب الملعب"]}
                tableData={tableRows}
              />
            }
          />
        </ItemGrid>

      </Grid>
      <div>
        <Dialog
          dir="rtl"
          fullWidth
          maxWidth="md"
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle id="form-dialog-title">{forUpdate ? "تعديل بيانات العميل" : "إضافة عميل جديد"}</DialogTitle>
            <DialogContent>
              <Grid container>
                <ItemGrid sx={12} md={6}>
                  <RHFInput
                    as={<TextField
                      id="name"
                      label="المدينة"
                      type="text"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />}
                    rules={{ required: true }}
                    name="name"
                    register={register}
                    setValue={setValue} />
                </ItemGrid>
                <ItemGrid sx={12} md={6}>
                  <RHFInput
                    as={<TextField
                      id="description"
                      label="المدينة"
                      type="text"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />}
                    rules={{ required: true }}
                    name="description"
                    register={register}
                    setValue={setValue} />
                </ItemGrid>

                <ItemGrid sx={12} md={6}>
                  <RHFInput
                    as={<Select
                      isMulti
                      options={services}
                    />}
                    rules={{ required: true }}
                    name="services"
                    register={register}
                    setValue={setValue} />
                </ItemGrid>

                <ItemGrid sx={12} md={6}>
                  <Controller
                    name="images"
                    control={control}
                    render={({ field }) => <input
                      type="file"
                      multiple='multiple'
                      onChange={(e) => { console.log(e.target.files); setselectedImages(e.target.files) }}

                    />}
                  />
                </ItemGrid>

                <ItemGrid sx={12} md={6}>
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

                <ItemGrid sx={12} md={6}>
                  <RHFInput
                    as={<TextField
                      id="price"
                      label="السعر"
                      type="text"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />}
                    rules={{ required: true }}
                    name="price"
                    register={register}
                    setValue={setValue} />
                </ItemGrid>

                <ItemGrid sx={12} md={6}>
                  <RHFInput
                    as={<TextField
                      id="type"
                      label="النوع"
                      type="text"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />}
                    rules={{ required: true }}
                    name="type"
                    register={register}
                    setValue={setValue} />
                </ItemGrid>

                <ItemGrid sx={12} md={4}>
                  <RHFInput
                    as={<TextField
                      id="dayStartTime"
                      label="زمن بداية الوردية النهارية"
                      type="time"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />}
                    rules={{ required: true }}
                    name="dayStartTime"
                    register={register}
                    setValue={setValue} />
                </ItemGrid>

                <ItemGrid sx={12} md={6}>
                  <RHFInput
                    as={<TextField
                      id="dayEndTime"
                      label="زمن إنتهاء الوردية النهارية"
                      type="time"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />}
                    rules={{ required: true }}
                    name="dayEndTime"
                    register={register}
                    setValue={setValue} />
                </ItemGrid>

                <ItemGrid sx={12} md={6}>
                  <RHFInput
                    as={<TextField
                      id="nightStartTime"
                      label="زمن بداية الوردية المسائية"
                      type="time"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />}
                    rules={{ required: true }}
                    name="nightStartTime"
                    register={register}
                    setValue={setValue} />
                </ItemGrid>


                <ItemGrid sx={12} md={6}>
                  <RHFInput
                    as={<TextField
                      id="nightEndTime"
                      label="زمن إنتهاء الوردية المسائية"
                      type="time"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />}
                    rules={{ required: true }}
                    name="nightEndTime"
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
      </div>
    </div>
  );
}

export default withStyles(styles)(TableList);

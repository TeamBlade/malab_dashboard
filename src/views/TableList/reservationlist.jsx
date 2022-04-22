import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { ItemGrid, RegularCard, Table } from "components";
import { Button, Grid, withStyles } from 'material-ui';
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RHFInput } from 'react-hook-form-input';
import Select  from 'react-select';
import { acceptBooking, createBooking, getAllBooking, rejectBooking } from "../../api/booking";
import { getPlaygroundsDropdown } from '../../api/playgrounds';
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

function TableList({ ...props }) {
  const { classes } = props
  const [reservationList, setReservationList] = useState([])
  const [tableRows, setTableRows] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const showBookingActions = getUserState().isAdmin
  const fetchData = () => {
    getAllBooking(pageNumber, pageSize).then(data => {
      if (!data)
        data = []
      setReservationList(data)
      const rows = data.map(v => [v.ref, v.startTime + " " + v.endTime, v.playground.name,v.playgroundOwner.firstName + " " + v.playgroundOwner.lastName, v.user.firstName +" " + v.user.lastName])
      console.log('tablelist', rows);
      setTableRows(rows)
    })
  }

  useEffect(() => {
    fetchData()
  }, [pageNumber])

  const refreshTable = () => {
    fetchData()
  }

  useEffect(() => {
    fetchData()
    getPlaygroundsDropdown().then(data => setplaygrounds(data))
  }, [])
  const [selectedRow, setSelectedRow] = useState(null);
  const [playgrounds, setplaygrounds] = useState([]);
  // form
  const [initalFormData, setInitialFormData] = useState(null);
  const defaultValues = initalFormData || {
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
    const fieldsNames = ['playground', 'startTime', 'emdTime', 'date', 'id']
    fieldsNames.forEach(field => setValue(field, ''))
  }

  const onSubmit = data => {
    data.playground = data.playground.value
    createBooking(data).then(res => console.log(res))
    setOpen(false)
    setForUpdate(false)
    resetForm()
    refreshTable()
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
    if (initalFormData !== null && initalFormData !== undefined) {
      setOpen(true)
      Object.keys(initalFormData).forEach(key => {
        setValue(key, initalFormData[key])
        setValue("type", "user")
      })
    }
  }, [initalFormData])

  const handleEditClick = ({ prop, key }) => {
    const data = reservationList[key]
    setForUpdate(true)
    setInitialFormData(data)
  }

  const handleDeleteClick = ({ prop, key }) => {

  }
  const handleAcceptClick = ({prop, key}) => {
    const id = reservationList[key]._id
    acceptBooking(id).then(res => {})
  }
  const handleRejectClick = ({prop, key}) => {
    const id = reservationList[key]._id
    rejectBooking(id).then(res => {})
  }
  return (
    <div>
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <RegularCard
            cardTitle={
              <Grid container>

                <ItemGrid xs={11} md={11}>

                  قائمه الحجوزات
                </ItemGrid>
                <ItemGrid xs={1} md={1}>
                  <Button color="primary" onClick={() => setOpen(true)}>Create</Button>
                </ItemGrid>
              </Grid>
            }
            cardSubtitle="من الاحدث الي الاقدم"
            content={
              <Table
                handleDeleteClick={handleDeleteClick}
                handleEditCLick={handleEditClick}
                showBookingActions={showBookingActions}
                handleAcceptClick={handleAcceptClick}
                handleRejectClick={handleRejectClick}
                tableHeaderColor="primary"
                tableHead={["رقم الحجز", "وقت الحجز", "اسم الملعب", "اسم الحاجز", "إسممستخدم"]}
                tableData={tableRows}
              />
            }
          />
        </ItemGrid>

      </Grid>
      <Dialog
        dir="rtl"
        fullWidth
        maxWidth="md"
        open={open}
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
    </div>
  );
}

export default withStyles(styles)(TableList);

import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import { ItemGrid, RegularCard, Table } from "components";
import { Button, Grid, withStyles } from 'material-ui';
import React, { useEffect, useState } from "react";
import ReservationsForm from 'views/forms/reservationForm';
import { acceptBooking, getAllBooking, rejectBooking } from "../../api/booking";
import { getUserState } from '../../state/user';
import { useFormik } from 'formik'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  }
});

const searchStyle = {
  maxWidth: '200px',
  width: '200px'
}

function TableList({ ...props }) {
  const { classes } = props
  const [reservationList, setReservationList] = useState([])
  const [tableRows, setTableRows] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [formData, setFormData] = useState(null)
  const [open, setOpen] = useState(false);
  const [forUpdate, setForUpdate] = useState(false);
  let componentActive = true;

  const showBookingActions = getUserState().isAdmin
  const fetchData = (signal) => {
    getAllBooking(pageNumber, pageSize).then(data => {
      if (!data)
        data = []
      if (componentActive) {
        console.log(data)
        setReservationList(data)
        const rows = data.map(v => [v.ref, v.startTime + " " + v.endTime, v.playground.name, v.playgroundOwner.firstName + " " + v.playgroundOwner.lastName, v.user.firstName + " " + v.user.lastName])
        setTableRows(rows)
      }

    })
  }

  useEffect(() => {
    fetchData(componentActive)
    return () => { componentActive = false }
  }, [pageNumber])

  const refreshTable = () => {
    fetchData()
  }

  // form

  useEffect(() => {
    fetchData(componentActive)
    return () => { componentActive = false }
  }, [])

  const handleClose = () => {
    setOpen(false)
  }
  const nextPage = () => {
    setPageNumber(pageNumber + 1)
  }

  const prevPage = () => {
    if (pageNumber > 1)
      setPageNumber(pageNumber - 1)
  }


  const handleEditClick = ({ prop, key }) => {
    const data = reservationList[key]

    setForUpdate(true)
    setFormData(data)
    setOpen(true)
  }

  const handleDeleteClick = ({ prop, key }) => {

  }
  const handleAcceptClick = ({ prop, key }) => {
    const id = reservationList[key]._id
    acceptBooking(id).then(res => { refreshTable() })
  }
  const handleRejectClick = ({ prop, key }) => {
    const id = reservationList[key]._id
    rejectBooking(id).then(res => { refreshTable() })
  }

  const formik = useFormik({
    initialValues: {
      filter: ''
    },
    onSubmit: (values) => {
      getAllBooking(pageNumber, pageSize, values.filter).then(res => {
        if (!res)
          res = []
        setReservationList(res)
        const rows = res.map(v => [v.ref, v.startTime + " " + v.endTime, v.playground.name, v.playgroundOwner.firstName + " " + v.playgroundOwner.lastName, v.user.firstName + " " + v.user.lastName])
          ;
        setTableRows(rows)
        console.log(res)
      })

    }
  })

  return (
    <div>
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>

          <RegularCard
            headerColor='green'
            cardTitle={
              <Grid container>
                <ItemGrid xs={11} md={11}>
                  ?????????? ????????????????
                </ItemGrid>
                <ItemGrid xs={1} md={1}>
                  <button className='btn btn-outline-primary' onClick={() => {
                    setOpen(true)
                    setForUpdate(false)
                  }}>??????????</button>
                </ItemGrid>
              </Grid>
            }
            cardSubtitle="???? ???????????? ?????? ????????????"
            content={
              <div>
                <form onSubmit={formik.handleSubmit}>
                  <div className='d-flex justify-content-start'>
                    <input type='text' style={searchStyle}
                      onChange={formik.handleChange}
                      name='filter'
                      placeholder="?????????? ???????? ???????? ??????????" />
                    <button type='submit' className='btn btn-success'>??????</button>
                  </div>
                </form>
                <Table
                  hideEdit={true}
                  hideDelete={true}
                  reservationList={reservationList}
                  handleDeleteClick={handleDeleteClick}
                  handleEditClick={handleEditClick}
                  showBookingActions={showBookingActions}
                  handleAcceptClick={handleAcceptClick}
                  handleRejectClick={handleRejectClick}
                  tableHeaderColor="primary"
                  tableHead={["?????? ??????????", "?????? ??????????", "?????? ????????????", "?????? ???????? ??????????", "???????? ??????????????"]}
                  tableData={tableRows}
                />
              </div>
            }
          />
        </ItemGrid>
        <ItemGrid>
          <Button onClick={() => prevPage()}>???????????? ??????????????</Button>
          <Button onClick={() => nextPage()}>???????????? ??????????????</Button>

        </ItemGrid>
      </Grid>
      {open ? <ReservationsForm data={formData} forUpdate={forUpdate} refreshTable={refreshTable} handleClose={handleClose} /> : null}

    </div>
  );
}

export default withStyles(styles)(TableList);

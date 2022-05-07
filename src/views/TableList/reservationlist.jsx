import { ItemGrid, RegularCard, Table } from "components";
import { Button, Grid, withStyles } from 'material-ui';
import React, { useEffect, useState } from "react";
import ReservationsForm from 'views/forms/reservationForm';
import { acceptBooking, getAllBooking, rejectBooking } from "../../api/booking";
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
  const [formData, setFormData] = useState(null)
  const [open, setOpen] = useState(false);
  const [forUpdate, setForUpdate] = useState(false);

  const showBookingActions = getUserState().isAdmin
  const fetchData = () => {
    getAllBooking(pageNumber, pageSize).then(data => {
      if (!data)
        data = []
      setReservationList(data)
      const rows = data.map(v => [v.ref, v.startTime + " " + v.endTime, v.playground.name, v.playgroundOwner.firstName + " " + v.playgroundOwner.lastName, v.user.firstName + " " + v.user.lastName])
        ;
      setTableRows(rows)
    })
  }

  useEffect(() => {
    fetchData()
  }, [pageNumber])

  const refreshTable = () => {
    fetchData()
  }

  // form
  const [initalFormData, setInitialFormData] = useState(null);

  useEffect(() => fetchData(), [])
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
  }

  const handleDeleteClick = ({ prop, key }) => {

  }
  const handleAcceptClick = ({ prop, key }) => {
    const id = reservationList[key]._id
    acceptBooking(id).then(res => { })
  }
  const handleRejectClick = ({ prop, key }) => {
    const id = reservationList[key]._id
    rejectBooking(id).then(res => { })
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
                reservationList={reservationList}
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
      {open ? <ReservationsForm data={formData} forUpdate={forUpdate} refreshTable={refreshTable} handleClose={handleClose} /> : null}

    </div>
  );
}

export default withStyles(styles)(TableList);

import { ItemGrid, RegularCard, Table } from "components";
import { Button, Grid, withStyles } from 'material-ui';
import React, { useEffect, useState } from "react";
import ReservationsForm from 'views/forms/reservationForm';
import { acceptBooking, getAllBooking, rejectBooking } from "../../api/booking";
import { getUserState } from '../../state/user';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import { Search } from "@material-ui/icons";
import { CustomInput, IconButton as SearchButton } from "components";
import headerLinksStyle from "assets/jss/material-dashboard-react/headerLinksStyle";

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
  const fetchData = (signal) => {
    getAllBooking(pageNumber, pageSize, signal).then(data => {
      if (!data)
        data = []
      setReservationList(data)
      const rows = data.map(v => [v.ref, v.startTime + " " + v.endTime, v.playground.name, v.playgroundOwner.firstName + " " + v.playgroundOwner.lastName, v.user.firstName + " " + v.user.lastName])
        ;
      setTableRows(rows)
    })
  }

  useEffect(() => {
    const controller = new window.AbortController();
    fetchData(controller)
    return () => { controller.abort() }
  }, [pageNumber])

  const refreshTable = () => {
    fetchData()
  }

  // form
  const [initalFormData, setInitialFormData] = useState(null);

  useEffect(() => {
    const controller = new window.AbortController();
    fetchData(controller)
    return () => { controller.abort() }
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
            headerColor='green'
            cardTitle={
              <Grid container>
                <ItemGrid xs={11} md={11}>
                  قائمه الحجوزات
                </ItemGrid>
                <ItemGrid xs={1} md={1}>
                  <button className='btn btn-outline-primary' onClick={() => {
                    setOpen(true)
                    setForUpdate(false)
                  }}>إنشاء</button>
                </ItemGrid>
              </Grid>
            }
            cardSubtitle="من الأحدث إلى الأقدم"
            content={
              <div>
                <CustomInput
                  formControlProps={{
                    className: classes.margin + " " + classes.search
                  }}
                  inputProps={{
                    placeholder: "البحث بإسم صاحب الحجز",
                    inputProps: {
                      "aria-label": "البحث بإسم صاحب الحجز"
                    }
                  }}
                />
                <SearchButton
                  color="white"
                  aria-label="edit"
                  customClass={classes.margin + " " + classes.searchButton}
                >
                  <Search className={classes.searchIcon} />
                </SearchButton>
                <Table
                  reservationList={reservationList}
                  handleDeleteClick={handleDeleteClick}
                  handleEditCLick={handleEditClick}
                  showBookingActions={showBookingActions}
                  handleAcceptClick={handleAcceptClick}
                  handleRejectClick={handleRejectClick}
                  tableHeaderColor="primary"
                  tableHead={["رقم الحجز", "وقت الحجز", "إسم الملعب", "اسم صاحب الحجز", "إسمم الستخدم"]}
                  tableData={tableRows}
                />
              </div>
            }
          />
        </ItemGrid>
        <ItemGrid>
          <Button onClick={() => prevPage()}>الصفحة السابقة</Button>
          <Button onClick={() => nextPage()}>الصفحة التالية</Button>

        </ItemGrid>
      </Grid>
      {open ? <ReservationsForm data={formData} forUpdate={forUpdate} refreshTable={refreshTable} handleClose={handleClose} /> : null}

    </div>
  );
}

export default withStyles(styles)(TableList);

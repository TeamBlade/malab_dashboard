import { withStyles } from '@material-ui/core/styles';
import headerLinksStyle from "assets/jss/material-dashboard-react/headerLinksStyle";
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import { ItemGrid, RegularCard, Table } from "components";
import { useFormik } from 'formik';
import { Button, Grid } from "material-ui";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from 'react-router-dom';
import ClientsForm from 'views/forms/clientsForm';
import { deleteUser, getAllUsers } from "../../api/admin";
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

  margin: headerLinksStyle.margin,
  search: headerLinksStyle.seach,
  seachButton: headerLinksStyle.seachButton,
  searchIcon: headerLinksStyle.searchIcon
});

const searchStyle = {
  maxWidth: '200px',
  width: '200px'
}
function TableList(props) {
  const { classes } = props
  const [clientsList, setClientList] = useState([])
  const [tableRows, setTableRows] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [open, setOpen] = useState(false);
  const [forUpdate, setForUpdate] = useState(false);
  const [formData, setFormData] = useState(null)
  let componentActive = true

  const fetchData = (cancel) => {
    getAllUsers(pageNumber, pageSize, "user").then(data => {
      if (!data)
        data = []
      if (componentActive) {
        setClientList(data)
        const rows = data.map(v => [v.firstName + " " + v.lastName, v.phone, v.city, v.email,])
        setTableRows(rows)
      }
    })

  }

  useEffect(() => {
    fetchData(componentActive)
    return () => { componentActive = false }
  }, [pageNumber])

  useEffect(() => {
    fetchData(componentActive)
    return () => { componentActive = false }
  }, [])

  const refreshTable = () => {

    fetchData()
  }


  const handleClose = () => {
    setOpen(false)
    setForUpdate(false)
    setFormData(null)
  }
  const nextPage = () => {
    setPageNumber(pageNumber + 1)
  }

  const prevPage = () => {
    if (pageNumber > 1)
      setPageNumber(pageNumber - 1)
  }


  const handleEditClick = ({ prop, key }) => {
    let data = clientsList[key]
    data.type = 'user'
    setOpen(true)
    setForUpdate(true)
    setFormData(data)
  }

  const handleDeleteClick = ({ prop, key }) => {
    const answer = window.confirm("???? ?????? ??????????")
    if (answer)
      deleteUser(clientsList[key].id).then(
        res => {
          let list = tableRows.filter((_, i) => i !== key)
          setTableRows(list)

        }
      )
  }
  const formik = useFormik({
    initialValues: {
      filter: ''
    },
    onSubmit: (values) => {
      getAllUsers(pageNumber, pageSize, 'user', values.filter).then(res => {
        if (res)
          setClientList(res)
        const rows = res.map(v => [v.firstName + " " + v.lastName, v.phone, v.city, v.email,])
          ;
        setTableRows(rows)
      })

    }
  })
  const isAdmin = getUserState().isAdmin;
  if (isAdmin)
    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <RegularCard
              headerColor='green'
              cardTitle={
                <Grid container>

                  <ItemGrid xs={11} md={11}>
                    ?????????? ??????????????
                  </ItemGrid>
                  <ItemGrid xs={1} md={1}>
                    <button className='btn btn-outline-primary' onClick={() => {
                      setOpen(true);
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
                        placeholder="?????????? ???????? ??????????????" />
                      <button type='submit' className='btn btn-success'>??????</button>
                    </div>
                  </form>
                  <Table
                    showEditButton={true}
                    showDeleteButton={false}
                    handleDeleteClick={handleDeleteClick}
                    handleEditClick={handleEditClick}
                    tableHeaderColor="primary"
                    tableHead={["?????? ????????????", "?????? ????????????", "??????????????", "??????????????"]}
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
        {open ? <ClientsForm data={formData} forUpdate={forUpdate} refreshTable={refreshTable} handleClose={handleClose} /> : null}

      </div>
    );
  else
    return (<Redirect from='/clients' to='/login' />)
}

export default withStyles(styles)(TableList);
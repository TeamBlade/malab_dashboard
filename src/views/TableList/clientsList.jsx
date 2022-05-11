import { withStyles } from '@material-ui/core/styles';
import { ItemGrid, RegularCard, Table } from "components";
import { Button, Grid } from "material-ui";
import React, { useEffect, useState } from "react";
import { Redirect } from 'react-router-dom';
import ClientsForm from 'views/forms/clientsForm';
import { deleteUser, getAllUsers } from "../../api/admin";
import { getUserState } from '../../state/user';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';

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
  const [open, setOpen] = useState(false);
  const [forUpdate, setForUpdate] = useState(false);
  const [formData, setFormData] = useState(null)

  const fetchData = (cancel) => {
    getAllUsers(pageNumber, pageSize, "user", cancel).then(data => {
      if (!data)
        data = []
      setClientList(data)
      const rows = data.map(v => [v.firstName + " " + v.lastName, v.phone, v.city, v.email,])
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
    const data = clientsList[key]
    setOpen(true)
    setForUpdate(true)
    setFormData(data)
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
              headerColor='green'
              cardTitle={
                <Grid container>

                  <ItemGrid xs={11} md={11}>
                    قائمه العملاء
                  </ItemGrid>
                  <ItemGrid xs={1} md={1}>
                    <button className='btn btn-outline-primary' onClick={() => {
                      setOpen(true);
                      setForUpdate(false)
                    }}>إنشاء</button>
                  </ItemGrid>
                </Grid>
              }
              cardSubtitle="من الأحدث إلى الأقدم"
              content={
                <Table
                  showEditButton={true}
                  showDeleteButton={false}
                  handleDeleteClick={handleDeleteClick}
                  handleEditClick={handleEditClick}
                  tableHeaderColor="primary"
                  tableHead={["إسم العميل", "رقم الهاتف", "المدينه", "الإيميل"]}
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
        {open ? <ClientsForm data={formData} forUpdate={forUpdate} refreshTable={refreshTable} handleClose={handleClose} /> : null}

      </div>
    );
  else
    return (<Redirect from='/clients' to='/login' />)
}

export default withStyles(styles)(TableList);
import { withStyles } from '@material-ui/core/styles';
import { ItemGrid, RegularCard, Table } from "components";
import { Button, Grid } from "material-ui";
import React, { useEffect, useState } from "react";
import OwnersForm from 'views/forms/ownersForm';
import { deleteUser, getAllUsers } from "../../api/admin";

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

  const fetchData = () => {
    getAllUsers(pageNumber, pageSize, "owner").then(data => {
      if (!data)
        data = []
      setClientList(data)
      const rows = data.map(v => [v.firstName + " " + v.lastName, v.phone, v.city, v.email,])
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


  const handleClose = () => {
    setOpen(false)
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

  return (
    <div>
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <RegularCard
            cardTitle={
              <Grid container>

                <ItemGrid xs={11} md={11}>
                  قائمه إصحاب الملاعب
                </ItemGrid>
                <ItemGrid xs={1} md={1}>
                  <Button color="primary" onClick={() => {
                    setOpen(true);
                    setForUpdate(false)
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
                tableHead={["اسم صاحب الملعب", "رقم الهاتف", "المدينه", "الايميل"]}
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
      {open ? <OwnersForm data={formData} forUpdate={forUpdate} refreshTable={refreshTable} handleClose={handleClose} /> : null}
    </div>
  );
}

export default withStyles(styles)(TableList);
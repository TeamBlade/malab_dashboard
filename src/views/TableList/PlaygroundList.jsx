import { withStyles } from '@material-ui/core/styles';
import { ItemGrid, RegularCard, Table } from "components";
import { Button, Grid } from "material-ui";
import React, { useEffect, useState } from "react";
import { deletePlayground, getAllPlaygrounds, getPlaygroundsByOwner } from '../../api/playgrounds';
import { getUserState } from '../../state/user';
import PlaygroundsForm from 'views/forms/playgroundForm'
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

const TableList = ({ ...props }) => {
  const { classes } = props

  const [playgroundsList, setPlaygroundlist] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [formData, setFormData] = useState(null)
  const [open, setOpen] = useState(false);
  const [forUpdate, setForUpdate] = useState(false);

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


  const refreshTable = () => {
    fetchData()
  }


  const handleClose = () => {
    setOpen(false)
    setForUpdate(false)
  }
  const nextPage = () => {
    setPageNumber(pageNumber + 1)
  }

  const prevPage = () => {
    if (pageNumber > 1)
      setPageNumber(pageNumber - 1)
  }

  const handleEditClick = ({ prop, key }) => {
    const data = playgroundsList[key]
    setForUpdate(true)
    setOpen(true)
    setFormData(data)
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
            headerColor='green'
            cardTitle={
              <Grid container>
                <ItemGrid xs={11} md={11}>
                  قائمه الملاعب
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
              <Table
                handleDeleteClick={handleDeleteClick}
                handleEditClick={handleEditClick}
                showDelete={getUserState().isAdmin}
                showEdit={getUserState().isAdmin}
                tableHeaderColor="primary"
                tableHead={["الرقم التعريفي	", "إسم الملعب	", "موقع الملعب	", "صاحب الملعب"]}
                tableData={tableRows}
              />
            }
          />
        </ItemGrid>

      </Grid>
      <div>
        {open ? <PlaygroundsForm data={formData} forUpdate={forUpdate} refreshTable={refreshTable} handleClose={handleClose} /> : null}

      </div>
    </div>
  );
}

export default withStyles(styles)(TableList);

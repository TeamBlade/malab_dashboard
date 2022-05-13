import { withStyles } from '@material-ui/core/styles';
import { ItemGrid, RegularCard, Table } from "components";
import { Button, Grid } from "material-ui";
import React, { useEffect, useState } from "react";
import { deletePlayground, getAllPlaygrounds, getPlaygroundsByOwner } from '../../api/playgrounds';
import { getUserState } from '../../state/user';
import PlaygroundsForm from 'views/forms/playgroundForm'
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import headerLinksStyle from "assets/jss/material-dashboard-react/headerLinksStyle";
import { CustomInput, IconButton as SearchButton } from "components";
import { Search } from "@material-ui/icons";
import { RHFInput } from 'react-hook-form-input';
import { Controller, useForm } from "react-hook-form";

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

const TableList = ({ ...props }) => {
  const { classes } = props

  const [playgroundsList, setPlaygroundlist] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [formData, setFormData] = useState(null)
  const [open, setOpen] = useState(false);
  const [forUpdate, setForUpdate] = useState(false);
  const controller = new window.AbortController();
  const loadData = (data) => {
    if (!data)
      data = []
    let ref = 1;
    const rows = data.map(v => [`${ref++}`, v.name, v.city, v.ownerName])
    setTableRows(rows)
    setPlaygroundlist(data)
  }
  const fetchData = (signal) => {
    if (getUserState().isAdmin)
      getAllPlaygrounds(pageNumber, pageSize, signal).then(data => {
        loadData(data)
      });
    else {
      getPlaygroundsByOwner(signal, getUserState().id).then(data => loadData(data))
    }
  }

  const { control, setValue, register, handleSubmit, formState: { errors } } = useForm()

  useEffect(() => {
    fetchData(controller)
    return () => { controller.abort() }
  }, [])

  useEffect(() => {
    fetchData(controller)
    return () => { controller.abort() }
  }, [pageNumber])

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
    let data = playgroundsList[key]
    let _data = { ...data };
    _data.id = data._id
    _data.name = data.name
    _data.description = data.description
    _data.city = data.city
    _data.price = data.price
    _data.type = data.type
    _data.dayStartTime = data.dayShift.start;
    _data.dayEndTime = data.dayShift.end;
    _data.nightStartTime = data.nightShift.start;
    _data.nightEndTime = data.nightShift.end;
    _data.services = data.services.map(x => ({ label: x.name, value: x._id }))
    setForUpdate(true)
    setOpen(true)
    setFormData(_data)
  }

  const handleDeleteClick = ({ prop, key }) => {
    const answer = window.confirm("هل أنت متأكد")
    if (answer)
      deletePlayground(playgroundsList[key].id).then(
        res => {
          let list = tableRows.filter((_, i) => i !== key)
          setTableRows(list)

        }
      )
  }
  const onSubmit = (data) => {
    console.log(data)
    getAllPlaygrounds(pageNumber, pageSize, controller, data).then(res => console.log(res))
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
              <div>
                <form onSubmit={handleSubmit(onSubmit)} >
                  <RHFInput
                    as={
                      <CustomInput
                        formControlProps={{
                          className: classes.margin + " " + classes.search
                        }}
                        inputProps={{
                          placeholder: "البحث بإسم الملعب",
                          inputProps: {
                            "aria-label": "البحث بإسم الملعب"
                          }
                        }}
                      />}
                    rules={{ required: true }}
                    name="filter"
                    register={register}
                    setValue={setValue} />
                  <SearchButton
                    color="white"
                    aria-label="edit"
                    customClass={classes.margin + " " + classes.searchButton}
                  >
                    <Search className={classes.searchIcon} />
                  </SearchButton>
                </form>
                <Table
                  handleDeleteClick={handleDeleteClick}
                  handleEditClick={handleEditClick}
                  showDelete={getUserState().isAdmin}
                  showEdit={getUserState().isAdmin}
                  tableHeaderColor="primary"
                  tableHead={["الرقم التعريفي	", "إسم الملعب	", "موقع الملعب	", "صاحب الملعب"]}
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
      <div>
        {open ? <PlaygroundsForm data={formData} forUpdate={forUpdate} refreshTable={refreshTable} handleClose={handleClose} /> : null}

      </div>
    </div>
  );
}

export default withStyles(styles)(TableList);

import React, { useEffect, useState } from "react";
import { Grid } from "material-ui";

import { RegularCard, Table, ItemGrid } from "components";
import { getAllBooking } from "../../api/booking";
import ReservationForm from "../forms/reservationForm";
import { Button } from "material-ui";

function handleEditCLick(playground) {
  console.log(playground)
}

function handleSaveClick(formData) {
  console.log(formData)
}

function TableList({ ...props }) {
  const [reservationlist, setReservationList] = useState([])
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getAllBooking().then(data => {
      console.log(data)
      setReservationList(data)
    })
  }, [])
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
                  <Button color="primary" onClick={() => setShowModal(true)}>Create</Button>
                </ItemGrid>
              </Grid>
            }
            cardSubtitle="من الاحدث الي الاقدم"
            content={
              <Table
                handleDeleteClick={({ prop, key }) => {
                  let list = reservationlist;
                  list = list.filter((x, index) => index !== key)
                  setReservationList(list)
                }}
                handleEditCLick={handleEditCLick}
                 tableHeaderColor="primary"
                tableHead={["رقم الحجز", "وقت الحجز", "اسم الملعب", "اسم الحاجز"]}
                tableData={[[]]}
              />
            }
          />
        </ItemGrid>

      </Grid>
      <ReservationForm show={showModal} saveClick={() => { }}></ReservationForm>
    </div>
  );
}

export default TableList;

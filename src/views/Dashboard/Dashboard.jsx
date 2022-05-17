import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
import {
  ContentCopy,
  Store,
  InfoOutline,
  Warning,
  DateRange,
  LocalOffer,
  Update,
  ArrowUpward,
  AccessTime,
  Person,
  Accessibility
} from "@material-ui/icons";
import { withStyles, Grid } from "material-ui";
import { Link } from 'react-router-dom'
import {
  StatsCard,
  ChartCard,
  TasksCard,
  RegularCard,
  Table,
  ItemGrid
} from "components";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts";

import dashboardStyle from "assets/jss/material-dashboard-react/dashboardStyle";
import { getPendingOwners } from '../../api/owners'
import { getPendingPlaygrounds, getPlaygroundsCount } from '../../api/playgrounds'
import { getUserCount } from "../../api/admin";
import { getBookingCount } from "../../api/booking";

function Dashboard(props) {
  const [value, setValue] = useState(0)
  const [pendingPlaygrounds, setPendingPlaygrounds] = useState([])
  const [pendingOwners, setPendingOwners] = useState([])
  const [reservationsCount, setReservationsCount] = useState(0)
  const [ownersCount, setOwnersCount] = useState(0)
  const [clientsCount, setClientsCount] = useState(0)
  const [playgroundsCount, setPlaygroundsCount] = useState(0)
  let componentActive = true;
  useEffect(() => {
    getPendingPlaygrounds().then(data => {
      if (componentActive)
        setPendingPlaygrounds(data)
    })
    getPendingOwners().then(data => {
      if (componentActive)
        setPendingOwners(data)
    })
    getUserCount('user').then(data => {
      if (componentActive)
        setClientsCount(data)
    })
    getUserCount('owner').then(data => {
      if (componentActive)
        setOwnersCount(data)
    })
    getPlaygroundsCount().then(data => {
      if (componentActive)
        setPlaygroundsCount(data)
    })
    getBookingCount().then(data => {
      if (componentActive)
        setReservationsCount(data)
    })

    return () => {
      componentActive = false
    }

  }, [])

  const handleChange = (event, value) => {
    setValue(value);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <div>
      <Grid container>
        <ItemGrid xs={12} sm={6} md={3}>
          <Link to='/owners'>
            <StatsCard
              icon={Person}
              iconColor="orange"
              title="اصحاب الملاعب"
              description={ownersCount}
              small="صاحب ملعب"
              statIcon={DateRange}
              statIconColor="danger"
              statText="تم انضمام 3 من اصحاب الملاعب اليوم"

            />
          </Link>
        </ItemGrid>
        <ItemGrid xs={12} sm={6} md={3}>
          <Link to='playgrounds'>

            <StatsCard
              icon={Store}
              iconColor="green"
              title="الملاعب"
              description={playgroundsCount}
              small="ملعب"
              statIcon={DateRange}
              statText="تم اضافه 5 ملاعب جدد"
            />
          </Link>
        </ItemGrid>
        <ItemGrid xs={12} sm={6} md={3}>
          <Link to='/clients'>
            <StatsCard
              icon={Accessibility}
              iconColor="red"
              title="العملاء "
              description={clientsCount}
              small="عميل"
              statIcon={LocalOffer}
              statText="تم انضمام 3 من  المستخدمين الجدد اليوم"
            />
          </Link>
        </ItemGrid>
        <ItemGrid xs={12} sm={6} md={3}>
          <Link to='/reservations'>

            <StatsCard
              icon={InfoOutline}
              iconColor="blue"
              title="الحجوازت"
              description={reservationsCount}
              small="حجز"
              statIcon={Update}
              statText="تم حجز 3 من الملاعب اليوم"
            />
          </Link>
        </ItemGrid>
      </Grid>
      <Grid container>
        {/*<ItemGrid xs={12} sm={12} md={4}>
            <ChartCard
              chart={
                <ChartistGraph
                  className="ct-chart"
                  data={dailySalesChart.data}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              }
              chartColor="green"
              title="Daily Sales"
              text={
                <span>
                  <span className={this.props.classes.successText}>
                    <ArrowUpward
                      className={this.props.classes.upArrowCardCategory}
                    />{" "}
                    55%
                  </span>{" "}
                  increase in today sales.
                </span>
              }
              statIcon={AccessTime}
              statText="updated 4 minutes ago"
            />
          </ItemGrid>*/}
        {/*<ItemGrid xs={12} sm={12} md={4}>
            <ChartCard
              chart={
                <ChartistGraph
                  className="ct-chart"
                  data={emailsSubscriptionChart.data}
                  type="Bar"
                  options={emailsSubscriptionChart.options}
                  responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                  listener={emailsSubscriptionChart.animation}
                />
              }
              chartColor="orange"
              title="Email Subscriptions"
              text="Last Campaign Performance"
              statIcon={AccessTime}
              statText="campaign sent 2 days ago"
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={12} md={4}>
            <ChartCard
              chart={
                <ChartistGraph
                  className="ct-chart"
                  data={completedTasksChart.data}
                  type="Line"
                  options={completedTasksChart.options}
                  listener={completedTasksChart.animation}
                />
              }
              chartColor="red"
              title="Completed Tasks"
              text="Last Campaign Performance"
              statIcon={AccessTime}
              statText="campaign sent 2 days ago"
            />
            </ItemGrid>*/}
      </Grid>
      <Grid container>
        {/* <ItemGrid xs={12} sm={12} md={6}>
            <TasksCard />
          </ItemGrid>*/}
        <ItemGrid xs={12} sm={12} md={6}>
          <RegularCard
            headerColor="blue"
            cardTitle="اصحاب الملاعب قيد التاكيد"
            cardSubtitle="Pending Owners"
            content={
              <Table
                tableHeaderColor="primary"
                hideEdit={true}
                hideDelete={true}
                tableHead={["الرقم التعريفي", "الاسم", "رقم الهاتف", "العنوان"]}
                tableData={pendingOwners}
              />
            }
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={6}>
          <RegularCard
            headerColor="red"
            cardTitle=" الملاعب قيد التاكيد"
            cardSubtitle="Pending Playgrounds"
            content={
              <Table
                hideEdit={true}
                hideDelete={true}
                tableHeaderColor="danger"
                tableHead={["الرقم التعريفي", "اسم الملعب", "موقع الملعب", "صاحب الملعب"]}
                tableData={pendingPlaygrounds}
              />
            }
          />
        </ItemGrid>
      </Grid>
    </div>
  );
}


Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);

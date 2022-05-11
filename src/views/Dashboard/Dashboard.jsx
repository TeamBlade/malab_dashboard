import React,{useState, useEffect} from "react";
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
import { getPendingPlaygrounds } from '../../api/playgrounds'

function Dashboard(props) {
  const [value, setValue] = useState(0)
  const [pendingPlaygrounds, setPendingPlaygrounds] = useState([])
  const [pendingOwners, setPendingOwners] = useState([])
  useEffect(() => {
    getPendingPlaygrounds().then(data => setPendingPlaygrounds(data))  
    getPendingOwners().then(data => setPendingOwners(data))
    return () => {
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
            <StatsCard
              icon={Person}
              iconColor="orange"
              title="اصحاب الملاعب"
              description="52"
              small="صاحب ملعب"
              statIcon={DateRange}
              statIconColor="danger"
              statText="تم انضمام 3 من اصحاب الملاعب اليوم"

            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={Store}
              iconColor="green"
              title="الملاعب"
              description="120"
              small="ملعب"
              statIcon={DateRange}
              statText="تم اضافه 5 ملاعب جدد"
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={Accessibility}
              iconColor="red"
              title="العملاء "
              description="75"
              small="عميل"
              statIcon={LocalOffer}
              statText="تم انضمام 3 من  المستخدمين الجدد اليوم"
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={InfoOutline}
              iconColor="blue"
              title="الحجوازت"
              description="32"
              small="حجز"
              statIcon={Update}
              statText="تم حجز 3 من الملاعب اليوم"
            />
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

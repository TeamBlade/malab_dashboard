import logo from "assets/img/malabwhite.png";
import image from "assets/img/trslide2.jpg";
import appStyle from "assets/jss/material-dashboard-react/appStyle.jsx";
import { Footer, Header, Sidebar } from "components";
// import jss and jss-rtl for change all style to support RTL
import { create } from 'jss';
import rtl from 'jss-rtl';
import { withStyles } from "material-ui";
// import MuiThemeProvider and createMuiTheme to create custom theme
import { createGenerateClassName, createMuiTheme, jssPreset, MuiThemeProvider } from 'material-ui/styles';
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import JssProvider from 'react-jss/lib/JssProvider';
import { Redirect, Route, Switch } from "react-router-dom";
import { getDashoardRoutes } from "../../routes/dashboard";
import { getUserState } from "../../state/user";
import { Provider } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useLocation } from "react-router-dom";

import ClientList from 'views/TableList/clientsList.jsx'
import OwnersList from 'views/TableList/ownerlist.jsx'




// create custom theme configuration
const theme = createMuiTheme({
  direction: 'rtl',
  typography: {
    fontFamily: '"Vazir", sans-serif'
  }
});
// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
// Custom Material-UI class name generator.
const generateClassName = createGenerateClassName();
let componentRoutes = getDashoardRoutes(false)
console.log(componentRoutes)
function getSwitchRoutes(routes) {
  return (
    <Switch>
      {routes.map((prop, key) => {
        if (prop.redirect)
          return <Redirect from={prop.path} to={prop.to} key={key} />;
        return <Route path={prop.path} component={prop.component} key={key} />;
      })}
      <Route path='/clients' component={ClientList}/>
    </Switch>
  )
}
function SidbarComponent({ ...props }) {
  const [routes, setRoutes] = useState(componentRoutes);
  const [switchRoutes, setSwitchRoutes] = useState(getSwitchRoutes(componentRoutes));
  const [mobileOpen, setmobileOpen] = useState(false);
  const { refs, classes, ...rest } = props
const refss = useRef("mainPanel")
const location = useLocation()
  const handleDrawerToggle = () => {
    setmobileOpen(!mobileOpen)
  };
  const getRoute = () => {
    return true;
  }
  useEffect(() => {
    setRoutes(getDashoardRoutes(getUserState().isAdmin))
    setSwitchRoutes(getSwitchRoutes(getDashoardRoutes(getUserState.isAdmin)))
    console.log(getDashoardRoutes(getUserState().isAdmin))
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <div className={classes.wrapper}>
          <Sidebar
            routes={getDashoardRoutes(getUserState().isAdmin)}
            logoText={"نخبه الملاعب "}
            logo={logo}
            image={image}
            handleDrawerToggle={handleDrawerToggle}
            open={mobileOpen}
            color="blue"
            location={location}
            {...rest}
          />
          <div className={classes.mainPanel} ref={refss}>
            <Header
              routes={getDashoardRoutes(getUserState().isAdmin)}
              handleDrawerToggle={handleDrawerToggle}
              {...rest}
            />
            {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
            {getRoute() ? (
              <div className={classes.content}>
                <div className={classes.container}>{switchRoutes}</div>
              </div>
            ) : (
              <div className={classes.map}>{switchRoutes}</div>
            )}
            {getRoute() ? <Footer /> : null}
          </div>
        </div>
      </JssProvider>
    </MuiThemeProvider>
  )
}
class App extends React.Component {
  state = {
    mobileOpen: false,
    isAdmin: true,
    routes: componentRoutes,
    switchRoutes: getSwitchRoutes(componentRoutes)
  };

  componentDidMount() {
    console.log(this.state.isAdmin)
    if (navigator.platform.indexOf('Win') > -1) {
      // eslint-disable-next-line
      // const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
  }
  componentDidUpdate() {
    // this.refs.mainPanel.scrollTop = 0;
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <SidbarComponent refs={this.refs} {...rest} classes={classes} />
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(appStyle)(App);

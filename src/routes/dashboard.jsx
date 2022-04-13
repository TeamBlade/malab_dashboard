import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import PlaygroundTableList from "views/TableList/PlaygroundList.jsx";
import ClientTableList from "views/TableList/clientsList.jsx";
import OwnerTableList from "views/TableList/ownerlist.jsx";
import ReservationTableList from "views/TableList/reservationlist.jsx";

import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import {
  Dashboard,
  Person,
  ContentPaste,
  LibraryBooks,
  BubbleChart,
  LocationOn,
  ExitToApp,
  Notifications
} from "@material-ui/icons";
import login from "../views/login";

const dashboardRoutes = [
  {
    path: "/dashboard",
    sidebarName: "الرئيسه",
    navbarName: "لوحه التحكم الرئيسه",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/clients",
    sidebarName: "قائمه العملاء ",
    navbarName: "قائمه العملاء",
    icon: Person,
    component: ClientTableList
  },
  {
    path: "/owners",
    sidebarName: " قائمه اصحاب الملاعب",
    navbarName: "قائمه اصحاب الملاعب",
    icon: Person,
    component: OwnerTableList
  },
  {
    path: "/playgrounds",
    sidebarName: "قائمه الملاعب ",
    navbarName: " قائمه الملاعب",
    icon: ContentPaste,
    component: PlaygroundTableList
  },
  {
    path: "/reservations",
    sidebarName: "قائمه الحجوزات",
    navbarName: "قائمه الحجوزات",
    icon: LibraryBooks,
    component: ReservationTableList
  },
  {
    path: "/icons",
    sidebarName: "الحساب الشخصي",
    navbarName: "الحساب الشخصي",
    icon: BubbleChart,
    component: UserProfile
  },

  {
    path: "/notifications",
    sidebarName: "الاشعارات",
    navbarName: "الاشعارات",
    icon: Notifications,
    component: UserProfile
  },
  {
    path: "/Logout",
    sidebarName: "تسجيل الدخول",
    navbarName: "تسجيل الدخول",
    icon: ExitToApp,
    component: login
  },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;

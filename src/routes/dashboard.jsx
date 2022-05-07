import {
  BubbleChart, ContentPaste, Dashboard, ExitToApp, LibraryBooks, Notifications, Person
} from "@material-ui/icons";
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import ClientTableList from "views/TableList/clientsList.jsx";
import OwnerTableList from "views/TableList/ownerlist.jsx";
import PlaygroundTableList from "views/TableList/PlaygroundList.jsx";
import ReservationTableList from "views/TableList/reservationlist.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import { getUserState } from "../state/user";
import logout from 'views/logout'

const isNotAdmin = getUserState().isAdmin === false;
let dashboardRoutes = [
  {
    path: "/dashboard",
    sidebarName: "الرئيسه",
    navbarName: "لوحه التحكم الرئيسه",
    icon: Dashboard,
    component: DashboardPage
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
    path: "/logout",
    sidebarName: "تسجيل الخروج",
    navbarName: "تسجيل الخروج",
    icon: ExitToApp,
    component: logout
  },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export function getDashoardRoutes(isAdmin) {
  const adminRotues = [
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
    }
  ]
  let routes = [
    {
      path: "/dashboard",
      sidebarName: "الرئيسه",
      navbarName: "لوحه التحكم الرئيسه",
      icon: Dashboard,
      component: DashboardPage
    }]
  if (isAdmin)
    routes = routes.concat(...adminRotues)
  routes = routes.concat([{
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
    path: "/logout",
    sidebarName: "تسجيل الخروج",
    navbarName: "تسجيل الخروج",
    icon: ExitToApp,
    component: logout
  },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
  ])
  return routes
}

export default dashboardRoutes;

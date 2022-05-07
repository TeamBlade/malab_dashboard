let UserState = {
  id: null,
  email: null,
  type: "",
  token: null,
  firstNane: "",
  lastNane: "",
  loggedIn: false,
  isAdmin: false,
};

export function setUserState(newState) {
  localStorage.setItem("loggedInUser", JSON.stringify(newState));

  UserState = { ...UserState, ...newState };
}

export function getUserState() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!loggedInUser) return UserState;
  else return loggedInUser;
}

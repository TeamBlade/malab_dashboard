let UserState = {
    id: null,
    email: null,
    type: '',
    token: null,
    firstNane: '',
    lastNane: '',
    loggedIn: false,
    isAdmin: false
}

export function setUserState(newState) {
    UserState = { ...UserState, ...newState }
}

export function getUserState() {
    return UserState;
}
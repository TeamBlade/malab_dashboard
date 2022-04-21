let UserState = {
    email: null,
    token: null,
    isAdmin: false,
    isLogdIn: false
}

export function setUserState(newState){
    UserState = {...UserState, ...newState }
}

export function getUserState() {
    return UserState;
}
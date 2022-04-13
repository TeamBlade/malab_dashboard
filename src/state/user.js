let UserState = {
    email: null,
    token: null,
    isAdmin: false
}

export function setUserState(newState){
    UserState = {...UserState, ...newState }
}

export function getUserState() {
    return UserState;
}
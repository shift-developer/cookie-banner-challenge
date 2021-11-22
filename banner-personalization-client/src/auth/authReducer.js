import { types } from "../types";

// const state = {
//     fullName: 'Juan Gonzalez',
//     logged: true,
//     userId: '123123',
//     email: 'asdasd'
// }

export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case types.login:
            return {
                ...action.payload,
                logged: true
            }

        case types.logout:
            return {
                logged: false
            }

        default:
            return state
    }
}
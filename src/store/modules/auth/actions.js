import api from "../../../api";
import { AUTH_API_ACTION, LOGIN_ACTION, REGISTER_ACTION, LOGOUT_ACTION, AUTO_LOGIN_ACTION, SET_USER_MUTATION, AUTO_LOGOUT_ACTION, SET_AUTO_LOGOUT_MUTATION } from "../../constant";
let timer = ''

export default {
    // Do auth action by communicating with BE
    async [AUTH_API_ACTION](context, payload) {
        try {
            // Send POST request, either to login/register api
            const response = await api.post(payload.url, {
                email: payload.email,
                password: payload.password
            })

            // Set timer for auto-logout (token expires in 1 hour)
            const expirationTime = 3600 * 1000
            const expiresAt = new Date().getTime() + expirationTime
            timer = setTimeout(() => {
                context.dispatch(AUTO_LOGOUT_ACTION)
            }, expirationTime)

            // Save token data to state and local storage
            const tokenData = {
                token: response.data.token,
                expiresAt: expiresAt
            }
            localStorage.setItem('token', JSON.stringify(tokenData))
            context.commit(SET_USER_MUTATION, tokenData)

            // Return success message
            return 'Authenticated'
        }
        catch (error) {
            // An error occured, return error message
            return error.response.data.message
        }
    },

    // Do login action by dispatching auth action with login api
    async [LOGIN_ACTION](context, payload) {
        return await context.dispatch(AUTH_API_ACTION, {
            ...payload,
            url: "/user/login"
        })
    },

    // Do register action by dispatching auth action with register api
    async [REGISTER_ACTION](context, payload) {
        return await context.dispatch(AUTH_API_ACTION, {
            ...payload,
            url: "/user/register"
        })
    },

    // Do logout action by removing token data from state and local storage, delete auto-logout timer
    [LOGOUT_ACTION](context) {
        localStorage.removeItem('token')
        context.commit(SET_USER_MUTATION, {
            token: null,
            expiresAt: null
        })
        if (timer) {
            clearTimeout(timer)
        }
    },

    // Perform auto-login action
    [AUTO_LOGIN_ACTION](context) {
        // Retrieve token from local storage
        const tokenDataString = localStorage.getItem('token')

        // If token in local storage
        if (tokenDataString) {
            // Retrieve expiration time
            const now = new Date().getTime()
            const tokenData = JSON.parse(tokenDataString)
            const expiresAt = tokenData.expiresAt

            // If token expired, do auto-logout action
            if (expiresAt < now) {
                context.dispatch(AUTO_LOGOUT_ACTION)
            }
            // If token still not expired, set timer for auto-logout
            else {
                timer = setTimeout(() => {
                    context.dispatch(AUTO_LOGOUT_ACTION)
                }, expiresAt - now)
            }

            // Set token data to state
            context.commit(SET_USER_MUTATION, tokenData)
        }
    },

    // When user auto-logout, dispatch logout action and set auto-logout to true
    [AUTO_LOGOUT_ACTION](context) {
        context.dispatch(LOGOUT_ACTION)
        context.commit(SET_AUTO_LOGOUT_MUTATION)
    }
}
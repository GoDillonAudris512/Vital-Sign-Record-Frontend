import api from "../../../api";
import { AUTH_API_ACTION, LOGIN_ACTION, REGISTER_ACTION, LOGOUT_ACTION, AUTO_LOGIN_ACTION, SET_USER_MUTATION, AUTO_LOGOUT_ACTION, SET_AUTO_LOGOUT_MUTATION } from "../../constant";
let timer = ''

export default {
    async [AUTH_API_ACTION](context, payload) {
        try {
            const response = await api.post(payload.url, {
                email: payload.email,
                password: payload.password
            })

            const expirationTime = 10 * 1000
            const expiresAt = new Date().getTime() + expirationTime
            timer = setTimeout(() => {
                context.dispatch(AUTO_LOGOUT_ACTION)
            }, expirationTime)

            const tokenData = {
                token: response.data.token,
                expiresAt: expiresAt
            }
            localStorage.setItem('token', JSON.stringify(tokenData))
            context.commit(SET_USER_MUTATION, tokenData)

            return 'Authenticated'
        }
        catch (error) {
            return error.response.data.message
        }
    },

    async [LOGIN_ACTION](context, payload) {
        return await context.dispatch(AUTH_API_ACTION, {
            ...payload,
            url: "/user/login"
        })
    },

    async [REGISTER_ACTION](context, payload) {
        return await context.dispatch(AUTH_API_ACTION, {
            ...payload,
            url: "/user/register"
        })
    },

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

    [AUTO_LOGIN_ACTION](context) {
        const tokenDataString = localStorage.getItem('token')

        if (tokenDataString) {
            const now = new Date().getTime()
            const tokenData = JSON.parse(tokenDataString)
            const expiresAt = tokenData.expiresAt

            if (expiresAt < now) {
                context.dispatch(AUTO_LOGOUT_ACTION)
            }
            else {
                timer = setTimeout(() => {
                    context.dispatch(AUTO_LOGOUT_ACTION)
                }, expiresAt - now)
            }

            context.commit(SET_USER_MUTATION, tokenData)
        }
    },

    [AUTO_LOGOUT_ACTION](context) {
        context.dispatch(LOGOUT_ACTION)
        context.commit(SET_AUTO_LOGOUT_MUTATION)
    }
}
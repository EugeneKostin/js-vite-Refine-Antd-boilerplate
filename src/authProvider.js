export const TOKEN_KEY = 'refine-auth'

export const authProvider = {
    login: async ({ username, email, password }) => {
        if ((username || email) && password) {
            localStorage.setItem(TOKEN_KEY, username)

            return Promise.resolve()
        }

        return Promise.reject(new Error('username: admin, password: admin'))
    },
    logout: () => {
        localStorage.removeItem(TOKEN_KEY)

        return Promise.resolve()
    },
    checkError: () => Promise.resolve(),
    checkAuth: () => {
        const token = localStorage.getItem(TOKEN_KEY)

        if (token) {
            return Promise.resolve()
        }

        return Promise.reject()
    },
    getPermissions: () => Promise.resolve(),
    getUserIdentity: async () => {
        const token = localStorage.getItem(TOKEN_KEY)

        if (!token) {
            return Promise.reject()
        }

        return Promise.resolve({
            id: 1,
        })
    },
}

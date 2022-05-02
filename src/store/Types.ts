interface initialStateType {
    isLoggedIn: boolean
    // user: userType
    user: any,
    client_id: string
    redirect_uri: string
    client_secret: string
    proxy_url: string
}

// interface userType {
//     avatar_url: string
//     bio: string
//     name: string
//     public_repos: number
//     followers: number
//     following: number
// }



export type { initialStateType };
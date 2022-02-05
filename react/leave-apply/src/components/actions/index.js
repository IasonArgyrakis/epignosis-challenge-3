export const logged = (data)=>{
    return {
        type: "user_SIGN_IN",
        payload:data
    }
}

export const allApplications = (data)=>{
    return {
        type: "allApplications",
        payload:data
    }
}

export const CurrentUserApplications = (data)=>{
    return {
        type: "CurrentUserApplications",
        payload:data
    }
}
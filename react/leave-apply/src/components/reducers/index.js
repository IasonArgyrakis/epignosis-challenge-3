import {combineReducers} from "redux";


const allApplications = (state=[],action)=>{
    switch (action.type){
        case 'allApplications':
            return action.payload
        default:return state
    }
}

const loggedReducer = (state=false,action)=>{
    switch (action.type){
        case 'user_SIGN_IN':
            return action.payload
        default:return state
    }
}

const allReducers = combineReducers({
    logged:loggedReducer,
    allApplications:allApplications
})
export default  allReducers
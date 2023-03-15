export const REG_ID='REG_ID'
export const REG_TYPE='REG_TYPE'
export const ROW_NO='ROW_NO'
export const SCREEN_NAME= 'SCREEN_NAME'
export const FAV_ARTICLE='FAV_ARTICLE'
export const FETCH_REQUEST='FETCH_REQUEST'
export const FETCH_SUCCESS='FETCH_SUCCESS'
export const FETCH_FAILURE='FETCH_FAILURE'
export const FETCH_REQUEST_PROFILE='FETCH_REQUEST_PROFILE'
export const FETCH_SUCCESS_PROFILE='FETCH_SUCCESS_PROFILE'
export const FETCH_FAILURE_PROFILE='FETCH_FAILURE_PROFILE'
export const USER_EMAIL='USER_EMAIL'
export const USER_PASS='USER_PASS'
export const RECENT_CURES='RECENT_CURES'
export const CHAT_INFO='CHAT_INFO'
export const TOP_DOCTORS='TOP_DOCTORS'

export function chatInfo(info){
    return {
        type:'CHAT_INFO',
        payload:info
    }
}

export function recentCures(cures){
    return{
        type:'RECENT_CURES',
        payload:cures
    }
}
export function topDoctors(top){
    return{
        type:'TOP_DOCTORS',
        payload:top
    }
}

export function getEmail(userEmail){
    return{
        type:'USER_EMAIL',
        payload:userEmail
    }
}
export function getPass(pass){
    return{
        type:'USER_PASS',
        payload:pass
    }
}

export function screenName(name){
    return {
type:'SCREEN_NAME',
payload: name
    }
}
export function reg(id){
    return {
        type: 'REG_ID',
        payload: id
    }
}
export function row(rowId){
    return {
        type: 'ROW_NO',
        payload: rowId
    }
}
export function type(typeId){
    return {
        type: 'REG_TYPE',
        payload: typeId
    }
}
export function fav(status){
    return{
        type:'FAV_ARTICLE',
        payload:status
    }
}
    export function fetchRequest(){
        return{
            type:'FETCH_REQUEST'
        }
    }
    export function fetchSuccess(data){
        return{
            type:'FETCH_SUCCESS',
            payload:data
        }
    }
    export function fetchFailure(error){
        return{
            type:'FETCH_FAILURE',
            payload:error
        }
    }

    export function fetchRequestProfile(){
        return{
            type:'FETCH_REQUEST_PROFILE'
        }
    }
    export function fetchSuccessProfile(idea){
        return{
            type:'FETCH_SUCCESS_PROFILE',
            payload:idea
        }
    }
    export function fetchFailureProfile(error){
        return{
            type:'FETCH_FAILURE_PROFILE',
            payload:error
        }
    }
        



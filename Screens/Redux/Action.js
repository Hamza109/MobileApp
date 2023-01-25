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
        



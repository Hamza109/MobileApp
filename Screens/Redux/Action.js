export const REG_ID='REG_ID'
export const SCREEN_NAME= 'SCREEN_NAME'
export const FAV_ARTICLE='FAV_ARTICLE'
export const FETCH_REQUEST='FETCH_REQUEST'
export const FETCH_SUCCESS='FETCH_SUCCESS'
export const FETCH_FAILURE='FETCH_FAILURE'
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
        



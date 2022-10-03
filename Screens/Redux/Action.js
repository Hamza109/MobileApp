export const REG_ID='REG_ID'
export const SCREEN_NAME= 'SCREEN_NAME'
export const FAV_ARTICLE='FAV_ARTICLE'
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
export function fav(state){
    return{
        type:'FAV_ARTICLE',
        payload:state
    }
}
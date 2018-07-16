export const ON_USER_LOGIN = 'ON_USER_LOGIN';

export function onUserLogin(userLoginData) {
    return {
        type: ON_USER_LOGIN,
        data: userLoginData
    }
}
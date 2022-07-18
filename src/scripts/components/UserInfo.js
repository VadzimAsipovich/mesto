export default class UserInfo {
    constructor({userNameSelector, userInfoSelector}){
        this._userNameSelector = userNameSelector;
        this._userInfoSelector = userInfoSelector;
        this._userName = document.querySelector(this._userNameSelector).textContent;
        this._userInfo = document.querySelector(this._userInfoSelector).textContent;
    };
    getUserInfo(){
        const obj = {
            userName: this._userName,
            userInfo: this._userInfo
        }
        return obj;
    }
    setUserInfo({userName, userInfo}){
        this._userName = userName;
        this._userInfo = userInfo;
        document.querySelector(this._userNameSelector).textContent = this._userName;
        document.querySelector(this._userInfoSelector).textContent = this._userInfo;
    }
}
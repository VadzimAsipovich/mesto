export default class UserInfo {
  constructor(profileName,profileTitle,profileAvatar) {
    this._userNameSelector = profileName;
    this._userInfoSelector = profileTitle;
    this._userAvatarSelector = profileAvatar;
    this._userNameNode = document.querySelector(this._userNameSelector);
    this._userInfoNode = document.querySelector(this._userInfoSelector);
    this._userAvatarNode = document.querySelector(this._userAvatarSelector);
  }
  getUserInfo() {
    const obj = {
      userName: this._userName,
      userInfo: this._userInfo,
    };
    return obj;
  }
  setUserInfo(userName, userInfo, avatar = this._avatar, id) {
    this._userName = userName;
    this._userInfo = userInfo;
    this._avatar = avatar;
    this.id = id;
    this._userAvatarNode.src = this._avatar;
    this._userNameNode.textContent = this._userName;
    this._userInfoNode.textContent = this._userInfo;
  }
}

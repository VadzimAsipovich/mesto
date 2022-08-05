export default class Api {
  constructor({
    baseUrl,
    headers: { authorization, "Content-Type": contentType },
  }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._authorization = authorization;
    this._contentType = contentType;
    this._myUrl = this._baseUrl + "/users/me";
    this._cardsUrl = this._baseUrl + "/cards";
  }

  _checkResponse(res){
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  getInitialCards() {
    return fetch(this._cardsUrl, {
      headers: {
        authorization: this._authorization,
        "Content-Type": this._contentType,
      },
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  addNewCard(name, link) {
    return fetch(this._cardsUrl, {
      method: "POST",
      headers: {
        authorization: this._authorization,
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  deleteCard(id) {
    fetch(this._cardsUrl + "/" + id, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
      },
    });
  }
  getUser() {
    return fetch(this._myUrl, {
      headers: {
        authorization: this._authorization,
        "Content-Type": this._contentType,
      },
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  updateUser(name, about) {
    return fetch(this._myUrl, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
  addLike(id) {
    return fetch(this._cardsUrl + "/" + id + "/likes", {
      method: "PUT",
      headers: {
        authorization: this._authorization,
      },
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
  removeLike(id) {
    return fetch(this._cardsUrl + "/" + id + "/likes", {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
      },
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  updateAvatar(avatar){
    return fetch(this._myUrl+'/avatar', {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        avatar: avatar
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
}

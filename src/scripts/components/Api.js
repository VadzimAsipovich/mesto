export default class Api {
  constructor({
    baseUrl,
    headers: { authorization, "Content-Type": contentType },
  }) {
    this._baseUrl = baseUrl;
    this._authorization = authorization;
    this._contentType = contentType;
    this._myUrl = this._baseUrl + "/users/me";
    this._cardsUrl = this._baseUrl + "/cards";
  }

  getInitialCards() {
    return fetch(this._cardsUrl, {
      headers: {
        authorization: this._authorization,
        "Content-Type": this._contentType,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
        
      }
      return Promise.reject(`Ошибка: ${res.status}`);
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
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  deleteCard(id){
    fetch(this._cardsUrl+'/'+id, {
      method: "DELETE",
      headers: {
        authorization: this._authorization
      }
    })
  }
  getUser() {
    return fetch(this._myUrl, {
      headers: {
        authorization: this._authorization,
        "Content-Type": this._contentType,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
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
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  addLike(id){
    return fetch(this._cardsUrl+'/'+id+'/likes', {
      method: "PUT",
      headers: {
        authorization: this._authorization
      }
    })
  }
  removeLike(id){
    return fetch(this._cardsUrl+'/'+id+'/likes', {
      method: "DELETE",
      headers: {
        authorization: this._authorization
      }
    })
  }

}

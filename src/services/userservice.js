import Api from '@/services/api'

export default {
  fetchOneUser(email) {
    return Api().get(`/${email}/user`)
  },

  fetchOneByname(username) {
    return Api().get(`/find/${username}/user`)
  },

  addUser(user) {
    return Api().post('/users', user,
      {headers: {'Content-type': 'application/json'}})
  },

  uploadUserAvatar(data) {
    return Api().post('/uploadavatarurl', data, {headers: {'Content-type': 'multipart/form-data'}})
  },

  upvoteforAuthor (id) {
    return Api().put(`/currentuser/${id}/follow`)
  },

  cancelfollowAuthor (id) {
    return Api().put(`/currentuser/${id}/notfollow`)
  }
}



import Api from '@/services/api'

export default {
  fetchOneUser(email) {
    return Api().get(`/${email}/user`)
  },

  fetchOneByname(username) {
    return Api().get(`/find//${username}/user`)
  },

  addUser(user) {
    return Api().post('/users', user,
      {headers: {'Content-type': 'application/json'}})
  }
}



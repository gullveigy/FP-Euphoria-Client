import Api from '@/services/api'

export default {
  fetchOneUser(email) {
    return Api().get(`/${email}/user`)
  },

  addUser(user) {
    return Api().post('/users', user,
      {headers: {'Content-type': 'application/json'}})
  }
}


import Api from '@/services/api'

export default {
  fetchDiscussions () {
    return Api().get('/alldiscussions')
  },

  fetchUserDiscussion (email) {
    return Api().get(`/userdiscussions/${email}`)
  }
}





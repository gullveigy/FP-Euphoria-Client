import Api from '@/services/api'

export default {
  fetchUserDir (email) {
    return Api().get(`/userbooklilstdir/${email}`)
  },

  fetchUserDiscussion (email) {
    return Api().get(`/userdiscussions/${email}`)
  },

  fetchOneBooklistdir (id) {
    return Api().get(`/booklilstdir/${id}`)
  },

  upvoteforBookdir (id) {
    return Api().put(`/booklistdir/${id}/upvote`)
  }
}



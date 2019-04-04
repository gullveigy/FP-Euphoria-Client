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

  addOneBooklist (newbooklist) {
    return Api().post('/booklistdir', newbooklist,
      { headers: { 'Content-type': 'application/json'} })
  },

  upvoteforBookdir (id) {
    return Api().put(`/booklistdir/${id}/upvote`)
  },

  deleteBooklistdir (id) {
    return Api().delete(`/booklistdir/${id}`)
  }
}



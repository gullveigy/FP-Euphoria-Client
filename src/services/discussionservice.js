import Api from '@/services/api'

export default {
  fetchDiscussions () {
    return Api().get('/alldiscussions')
  },

  fetchDiscussionsSortDate () {
    return Api().get('/alldiscussions/sortbydate')
  },


  fetchDiscussionsbyQuerySearch (content) {
    return Api().get(`/fuzzysearch/${content}/discussions`)
  },

  fetchUserDiscussion (email) {
    return Api().get(`/userdiscussions/${email}`)
  },

  fetchOneDiscussion (id) {
    return Api().get(`/discussions/${id}`)
  },

  addNewPost (newpost) {
    return Api().post('/discussions', newpost,
      { headers: { 'Content-type': 'application/json'} })
  },

  upvoteforDiscussion (id) {
    return Api().put(`/discussions/${id}/vote`)
  }


}








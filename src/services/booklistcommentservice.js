import Api from '@/services/api'

export default {
  fetchBdirComment (id) {
    return Api().get(`/${id}/comment`)
  },

  addOneBcomment (bcomment) {
    return Api().post('/booklistcomments', bcomment,
      { headers: { 'Content-type': 'application/json'} })
  },

  upvote (id) {
    return Api().put(`/booklistcomment/${id}/upvote`)
  },

  deleteOneBooklistcomment (id) {
    return Api().delete(`/booklistcomment/${id}`)
  }


}





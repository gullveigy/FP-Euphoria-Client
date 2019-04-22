import Api from '@/services/api'


export default {
  fetchDiscommentsNow (dicussionid) {
    return Api().get(`/${dicussionid}/discomments`)
  },

  addOneDiscomment (discomment) {
    return Api().post('/discomments', discomment,
      { headers: { 'Content-type': 'application/json'} })
  },

  upvotefor (id) {
    return Api().put(`/discomments/${id}/upvote`)
  },

  downvotefor (id) {
    return Api().put(`/discomments/${id}/downvote`)
  },
}





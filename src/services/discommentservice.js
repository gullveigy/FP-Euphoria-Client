import Api from '@/services/api'


export default {
  fetchDiscommentsNow (dicussionid) {
    return Api().get(`/${dicussionid}/discomments`)
  },

  addOneDiscomment (discomment) {
    return Api().post('/discomments', discomment,
      { headers: { 'Content-type': 'application/json'} })
  }
}





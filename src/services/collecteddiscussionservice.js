import Api from '@/services/api'

export default {
  fetchCollectedDiscussion (collectemail) {
    return Api().get(`/userdiscussions/collected/${collectemail}`)
  },

  addNewCollected (newcollected) {
    return Api().post('/collecteddiscussions', newcollected,
      { headers: { 'Content-type': 'application/json'} })
  },

  deleteCollectedDiscussion (id) {
    return Api().delete(`/collecteddiscussions/${id}`)
  }
}

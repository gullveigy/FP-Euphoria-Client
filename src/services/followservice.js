import Api from '@/services/api'

export default {
  addFollower (newfollower) {
    return Api().post('/follow', newfollower,
      { headers: { 'Content-type': 'application/json'} })
  },

  fetchUserFollowing (email) {
    return Api().get(`/${email}/follower`)
  },

  deleteFollowing (id) {
    return Api().delete(`/follow/${id}`)
  }
}

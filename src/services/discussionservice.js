import Api from '@/services/api'

export default {
  fetchOneDiscussion () {
    return Api().get(`/fuzzysearch/to/discussions`)
  },

  fetchUserDiscussion (email) {
    return Api().get(`/userdiscussions/${email}`)
  }
}





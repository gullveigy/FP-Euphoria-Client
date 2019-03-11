import Api from '@/services/api'

export default {
  fetchOneBooklists (booklistid) {
    return Api().get(`/${booklistid}/books`)
  },

  deleteBook (id) {
    return Api().delete(`/books/${id}`)
  },

  addOneBook (booklist) {
    return Api().post('/booklist', booklist,
      { headers: { 'Content-type': 'application/json'} })
  }
}


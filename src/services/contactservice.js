import Api from '@/services/api'

export default {
  addContact (contact) {
    return Api().post('/contacts', contact,
      { headers: { 'Content-type': 'application/json'} })
  }
}

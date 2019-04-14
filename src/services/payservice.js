import Api from '@/services/api'

export default {
  pay(token) {
    return Api().post('/pay', token,
      { headers: { 'Content-type': 'application/json'} })
  },
  payment(id) {
    return Api().put(`/payment/${id}`)
  }
}



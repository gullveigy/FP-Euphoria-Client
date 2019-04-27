import Api from '@/services/api'

export default {
  addShppping(data) {
    return Api().post('/addshoppingcar', data,
      { headers: { 'Content-type': 'application/json'} })
  },

  getShoppingList(id) {
      return Api().get(`/shoppingcarlist/${id}`)
  },

  deleShopping(data) {
      return Api().post('/deleshopping', data, { headers: { 'Content-type': 'application/json'}} )
  }
}



















import Api from '@/services/api'

export default {
  createOrder(order) {
    return Api().post('/createorder', order,
      { headers: { 'Content-type': 'application/json'} })
  },

  setOrderStatus(data) {
    return Api().post('/updatestatus', data, { headers: { 'Content-type': 'application/json'} })
  },

  orderList(pageSize, currentPage, username) {
      return Api().get(`/orderlist/${pageSize}/${currentPage}/${username}`)
  },

  ordersearch(pageSize, currentPage, keyword) {
      return Api().get(`/ordersearch/${pageSize}/${currentPage}/${keyword}`)
  }
}



<template>
    <div>
        <div class="form" v-if="editedOrder">
            <input type="text" v-model="editedOrder.name">
            <div>{{editedOrder.calculatePrice()}}</div>
            <button @click="save"></button>
        </div>
    </div>
</template>

<script>
  import Order from './Order'

  function getOrderResponse(){
    return {
      "id": 10,
      "name": "Room order",
      "product": {
        "id": 54,
        "name": "Room in fancy hotel",
        "hourlyPrice": "5.00"
      },
      "dateRange": {
        "from": "2017-06-06",
        "to": "2017-06-08"
      }
    }
  }

  function saveOrderResponse(){

  }


  export default {
    data () {
      return { editedOrder: null }
    },
    created (){
      // Here we're loading our order by ajax.
      const orderData = getOrderResponse()
      this.editedOrder = new Order(orderData)
    },
    methods: {
      save(){
        // Here we're saving to server our edited order.
        saveOrderResponse(this.editedOrder)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>

<template>
  <div id="contactmessage">

    <h3>Admin Contact Message</h3>

  <div role="tablist" style="width: 800.01px; margin-left: auto; margin-right: auto">

    <b-card no-body class="mb-1" v-for="(Cmessage, index) in Cmessages" :key="index">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button style="background-color: gray; border-color: gray" block href="#" v-b-toggle.accordion-1 variant="info">{{Cmessage.title.substring(0,50)}}...</b-button>
      </b-card-header>
      <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
        <b-card-body   style="background-color: beige; width: 792.01px; margin-left: auto; margin-right: auto; border-radius:5px">
          <b-card-text style="color: black"><h5>Username:</h5>
                                       <h6>{{Cmessage.username}}</h6>
                                       <hr>
                                       <h5> Message Date:</h5>
                                       <h6>{{Cmessage.date}}</h6>
                                       <hr>
                                       <h5> Email:</h5>
                                       <h6>{{Cmessage.email}}</h6></b-card-text>
                                       <hr>
          <b-card-text style="color: black"><h5> Message Content: </h5>{{ Cmessage.content}}</b-card-text>


        </b-card-body>
      </b-collapse>
    </b-card>

  </div>
    <h4 style="color: white; font-size: 5pt; margin-bottom: 0px; margin-top: 20px;">-------Euphoria-------</h4>
  </div>
</template>

<script>


  import Vue from 'vue'
  import contactservice from '@/services/contactservice'
  import BCollapse from 'bootstrap-vue/es/components/collapse/collapse'
  Vue.component('b-collapse', BCollapse);
  import BFormCheckboxGroup from 'bootstrap-vue/es/components/form-checkbox/form-checkbox-group'
  Vue.component('b-form-checkbox-group', BFormCheckboxGroup);


    export default {
      name: "ContactMessage",
      data() {
        return {
          Cmessages: [],
          userame:'',
          date: '',
          content: '',
          title: '',
          email: ''

        }
      },
      created (){
        this.getContactMessage();
      },
      methods: {
        getContactMessage: function () {

          contactservice.fetchAllMessage()
            .then(response => {

              if (response) {
                this.Cmessages = response.data;
                console.log(this.Cmessages)
              }

            })

        }
      }
    }
</script>

<style scoped>


  header {
    width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

  p {
    width: 750px;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
  }


  h3 {
    color: #1c221f;
    font-size: 30pt;
    margin-bottom: 50px;
    margin-top: 40px;
  }

</style>

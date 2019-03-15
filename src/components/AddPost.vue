<template>
  <div id="addposts">
    <div class="container">
  <div class="container contact-form">
    <div class="contact-image">
      <img src="https://image.ibb.co/kUagtU/rocket_contact.png" alt="rocket_post"/>
    </div>
    <form method="post">
      <h3>Post Here</h3>
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <input type="text" name="txtName" class="form-control" placeholder="Book Name *" value="" />
          </div>
          <div class="form-group">
            <input type="text" name="txtEmail" class="form-control" placeholder="Title *" value="" />
          </div>
          <div class="form-group">
            <input type="text" name="txtPhone" class="form-control" placeholder="Subtitle *" value="" />
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group">
            <textarea name="txtMsg" class="form-control" placeholder="Write down your unique opinion *" style="width: 100%; height: 150px;"></textarea>
          </div>
          <div class="form-group">
            <input type="submit" name="btnSubmit" class="btnContact" value="Send Message" />
          </div>
        </div>
      </div>
    </form>
  </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "AddPost"
    }
</script>

<style scoped>

  div#addposts {
    background: url("../assets/whale10.jpg")repeat fixed;
    background-size: auto 100%;
    height: 700px;
  }



  body{
    background: -webkit-linear-gradient(left, #0072ff, #00c6ff);
  }
  .contact-form{
    background: #fff;
    margin-bottom: 5%;
    width: 70%;
  }
  .contact-form .form-control{
    border-radius:1rem;
  }
  .contact-image{
    text-align: center;
  }
  .contact-image img{
    border-radius: 6rem;
    width: 11%;
    margin-top: -3%;
    transform: rotate(29deg);
  }
  .contact-form form{
    padding: 14%;
  }
  .contact-form form .row{
    margin-bottom: -7%;
  }
  .contact-form h3{
    margin-bottom: 8%;
    margin-top: -10%;
    text-align: center;
    color: #1c221f;
  }
  .contact-form .btnContact {
    width: 50%;
    border: none;
    border-radius: 1rem;
    padding: 1.5%;
    background: rgba(42, 124, 99, 0.75);
    font-weight: 600;
    color: #fff;
    cursor: pointer;
  }
  input.btnContact
  {
    width: 50%;
    border-radius: 1rem;
    padding: 1.5%;
    color: #fff;
    background-color: #0062cc;
    border: none;
    cursor: pointer;
  }
</style>

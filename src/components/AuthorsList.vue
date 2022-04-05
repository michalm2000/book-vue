<template>
  <div id="main">
    <h1>Authors</h1>
    <div id="table">  
      <b-table striped hover :items="authors" :fields = "fields">
        <template #cell(actions)="data">
          <col class="actions-column">
          <action-buttons @load:authors="getAuthors()"  @load:editForm="showEditForm(data.value)" :id=data.value></action-buttons>
        </template>
      </b-table>
      <b-button @click="showAddForm()" variant="success">Add new author</b-button>
      
    </div>
    <author-form id="form" @post:author="postAuthor"  @edit:author="editAuthor" :authorToEdit="authorToEdit" hidden />
  </div>
  
</template>

<script>
import ActionButtons from './ActionButtons.vue'
import AuthorForm from './AuthorForm.vue'
export default {
  data(){
    return {
      fields: ['id','firstName', 'lastName', 'gender', 'actions'],
      authors: [],
      authorID: 0,
      authorToEdit: {id: 0, firstName: null, lastName: null, gender: null}
    }
  },
  name: 'AuthorsList',

  components:{
    AuthorForm,
    ActionButtons
  },
  methods: {
    
    async getAuthors(){
      try{
        const response = await fetch('http://localhost:8081/get/authors')
        let data = await response.json()
        this.authors = data.map(author => {
           return {...author, actions: author.id}
        })
        } catch (error){
          console.log(error)
        }
    },

    async editAuthor(eauthor, id){
      let data = eauthor
			let request = new Request(`http://localhost:8081/put/author/${id}`,
				{method: 'PUT', body: JSON.stringify(data), headers: new Headers({'Content-Type': 'application/json; charset=UTF8'})})
			
			fetch(request)
				.then(() => {
					this.getAuthors()
          document.getElementById("form").setAttribute("hidden", true)
					}
          
        )
      
    },

    async postAuthor(pauthor){
      let data = pauthor
      console.log(data)
      let request = new Request('http://localhost:8081/post/author',
				{method: 'POST', body: JSON.stringify(data), headers: new Headers({'Content-Type': 'application/json; charset=UTF8'})})
			
			fetch(request)
				.then(() => {
					this.getAuthors()
          document.getElementById("form").setAttribute("hidden", true)
					}
				)

    },

    showAddForm (){
      this.authorToEdit = {id: 0}
      document.getElementById("form").removeAttribute("hidden")
    },

    showEditForm(id){
      this.authorToEdit = {...this.authors.filter(author => author.id == id)[0]}
      document.getElementById("form").removeAttribute("hidden")
    }
    
    
  },
  mounted() {
      this.getAuthors()
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

#main{
  margin: 0 10vw;
}
#buttons {
  width: fit-content;
  display: flex;
  column-gap: 20px;
  justify-content: space-between;
}

.actions-column{
  width: 40px !important;
}

#form {
  margin-right: 30vw;
}



</style>

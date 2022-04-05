<template>
  <div id="main">
    <h1>Books</h1>
    <div id="table">  
      <b-table striped hover :items="getBooksTable" :fields = "fields">
        <template #cell(actions)="data">
          <col class="actions-column">
          <action-buttons @load:books="getBooks()"  @load:editForm="showEditForm(data.value)" :id=data.value></action-buttons>
        </template>
      </b-table>
      <b-button @click="showAddForm()" variant="success">Add new book</b-button>
      
    </div>
    <book-form id="form" @post:book="postBook"  @edit:book="editBook" :bookToEdit="bookToEdit" hidden />
  </div>
  
</template>

<script>
import ActionButtons from './ActionButtons.vue'
import BookForm from './BookForm.vue'
export default {
  data(){
    return {
      fields: ['id','title', 'author', 'pages', 'actions'],
      books: [],
      bookID: 0,
      bookToEdit: {id: 0, author: null, title: null, pages: null}
    }
  },
  name: 'BooksList',
  computed: {
    getBooksTable: function() {
      return  this.books.map(book => {
        return {...book, author: book.author.firstName + " " + book.author.lastName}
      })
    }   
  },
  components:{
    BookForm,
    ActionButtons
  },
  methods: {
    
    async getBooks(){
      try{
        const response = await fetch('http://localhost:8081/get/books')
        let data = await response.json()
        this.books = data.map(book => {
           return {...book, actions: book.id}
        })
        } catch (error){
          console.log(error)
        }
    },

    async editBook(ebook, id){
      let data = ebook
			let request = new Request(`http://localhost:8081/put/book/${id}`,
				{method: 'PUT', body: JSON.stringify(data), headers: new Headers({'Content-Type': 'application/json; charset=UTF8'})})
			
			fetch(request)
				.then(() => {
					this.getBooks()
          document.getElementById("form").setAttribute("hidden", true)
					}
          
        )
      
    },

    async postBook(pbook){
      let data = pbook
      let request = new Request('http://localhost:8081/post/book',
				{method: 'POST', body: JSON.stringify(data), headers: new Headers({'Content-Type': 'application/json; charset=UTF8'})})
			
			fetch(request)
				.then(() => {
					this.getBooks()
          document.getElementById("form").setAttribute("hidden", true)
					}
				)

    },

    showAddForm (){
      this.bookToEdit = {id: 0}
      document.getElementById("form").removeAttribute("hidden")
    },

    showEditForm(id){
      console.log(id)
      this.bookToEdit = {...this.books.filter(book => book.id == id)[0]}
      this.bookToEdit.author = this.bookToEdit.author.id
      console.log(this.bookToEdit)
      document.getElementById("form").removeAttribute("hidden")
    }
    
    
  },
  mounted() {
      this.getBooks()
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

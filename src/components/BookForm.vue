<template>
	<div id="book-form" >
		
		<b-form @submit.prevent="book.id == 0 ? postBook(book) : editBook(book)" method="post" >
			<b-form-group v-if="book.id != 0"
				id="input-group-0"
				label="Id:"
				label-for="input-0"
			>
				<b-form-input
					id="input-0"
					v-model="book.id"
					type="text"
					disabled
					></b-form-input>
			</b-form-group>
			<b-form-group
				id="input-group-1"
				label="Title:"
				label-for="input-1"
			>
				<b-form-input
					id="input-1"
					v-model="book.title"
					type="text"
					placeholder="Enter title"
					required
					></b-form-input>
			</b-form-group>
			
			<b-form-group id="input-group-2" label="Author: " label-for="input-2">
				<b-form-select id="input-2" v-model="book.author" :options="authors"  required>
				</b-form-select>
			</b-form-group>
			
			<b-form-group id="input-group-3" label="Pages: " label-for="input-3">
				<b-form-input id="input-3" v-model="book.pages" type="number" placeholder="Number of pages" required></b-form-input>
			</b-form-group>
			<b-button type="submit" variant="primary">Submit</b-button>
		</b-form>
	</div>
</template>



<script>
export default {
	data(){
		return {
			authors: [],
			book: {}
		}
	},
	name: 'BookForm',
	props: {
		bookToEdit: Object
	},
	watch: {
		bookToEdit(newVal, oldVal){
			oldVal
			this.book = newVal
		}
		
	},
	methods: {
		clearForm: function(){
			this.book.author = 0
			this.book.pages = null
			this.book.title = ""
		},
		
		async postBook(pbook){
			let retBook = {...pbook}
			retBook.authorId = retBook.author
			delete retBook.author
			delete retBook.id
			this.$emit('post:book', retBook)
			this.clearForm()
		},

		editBook(ebook){
			const retbookId = ebook.id
			let retBook = {...ebook}
			retBook.authorId = retBook.author
			delete retBook.author
			delete retBook.id
			this.$emit('edit:book', retBook, retbookId)
			this.clearForm()
		},

		async getAuthors(){
			try{
        const response = await fetch('http://localhost:8081/get/authors')
        let data = await response.json()
		this.authors = data.map(author => {
			return {value: author.id, text: author.firstName + " " + author.lastName + ", "+ author.id}
		})
        } catch (error){
          console.log(error)
        }
		}
	},
	mounted(){
		this.getAuthors()
	},
	created(){

	}
	
}
</script>

<style scoped>

hidden {
	visibility: hidden;
}
visible {
	visibility: visible;
}
button {
	margin-top: 1.2vh
}
</style>

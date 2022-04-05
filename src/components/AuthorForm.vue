<template>
	<div id="author-form" >
		
		<b-form @submit.prevent="author.id == 0 ? postAuthor(author) : editAuthor(author)" method="post" >
			<b-form-group v-if="author.id != 0"
				id="input-group-0"
				label="Id:"
				label-for="input-0"
			>
				<b-form-input
					id="input-0"
					v-model="author.id"
					type="text"
					disabled
					></b-form-input>
			</b-form-group>
			<b-form-group
				id="input-group-1"
				label="First name:"
				label-for="input-1"
			>
				<b-form-input
					id="input-1"
					v-model="author.firstName"
					type="text"
					placeholder="Enter first name"
					required
					></b-form-input>
			</b-form-group>

			<b-form-group
				id="input-group-2"
				label="Last Name:"
				label-for="input-2"
			>
				<b-form-input
					id="input-2"
					v-model="author.lastName"
					type="text"
					placeholder="Enter last name"
					required
					></b-form-input>
			</b-form-group>
			
			<b-form-group id="input-group-3" label="Gender: " label-for="input-3">
				<b-form-select id="input-3" v-model="author.gender" :options="genders"  required>
				</b-form-select>
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
			author: {},
			genders: [{value:"MALE", text: "Male"}, {value:"FEMALE", text: "Female"}]
			
		}
	},
	name: 'AuthorForm',
	props: {
		authorToEdit: Object
	},
	watch: {
		authorToEdit(newVal, oldVal){
			oldVal
			this.author = newVal
		}
		
	},
	methods: {
		clearForm: function(){
			this.author.firstName = ""
			this.author.lastName = "" 
			this.author.gender = "MALE"
		},
		
		async postAuthor(pauthor){
			let retAuthor = {...pauthor}
			delete retAuthor.id
			this.$emit('post:author', retAuthor)
			this.clearForm()
		},

		editAuthor(eauthor){
			const retauthorId = eauthor.id
			let retAuthor = {...eauthor}
			console.log(retAuthor)
			delete retAuthor.id
			this.$emit('edit:author', retAuthor, retauthorId)
			this.clearForm()
		},

	},
	
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

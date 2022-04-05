<template>
	<div>
		<button class="btn btn-primary" @click="emitLoad()">Edit</button>
		<button @click="deleteBook(id)" class="btn btn-danger">Delete</button>
	</div>
</template>

<script>

export default{
	props: {
        id: Number
    },
    methods: {
		async deleteBook(id){
			let request = new Request(`http://localhost:8081/delete/book/${id}`,
						{method: 'DELETE', headers: new Headers({'Content-Type': 'application/json; charset=UTF8'})})
			fetch(request)
				.then(() => {
						
						this.$emit('load:books')
						}
				)
		},
		emitLoad(){
			this.$emit('load:editForm')
		}
		
    },
	
	
}
</script>

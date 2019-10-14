let dataBooks = new Vue({

  el: "#vue-bookstore",
  data: {
 arrayBooks : [],
 arrayBooksEs : [],
 arrayBooksEn : [],
 search : "",
 //bookHtml : ``,
// https://api.myjson.com/bins/zyv02
 //https://api.myjson.com/bins/1h3vb3 
  },
  methods: {
    async getData() {
      //await the response of the fetch call
      let response = await fetch(`https://api.myjson.com/bins/1h3vb3`, {
        method: "GET",
        dataType: 'json',
        headers: {
        }
      });
        this.data = await response.json();
       this.arrayBooks = this.data.books;
       console.log(this.arrayBooks);
      
     // let data = await response.json();
  },
   filteredBooks(){
   return this.arrayBooks.filter((book) => {return book.titulo.toLowerCase().match(this.search.toLowerCase())
     
   })
 },
 
},

  mounted() {
    this.getData()
    
  },

})
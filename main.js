//Hai un array di oggetti rappresentanti libri:
const books = [
  { 
	  title: "React Billionaire", 
	  pages: 250, 
	  author: {
		  name: 'Alice',
		  age: 35
	  },
	  available: false,
	  price: '101€',
	  tags: ['advanced', 'js', 'react', 'senior']
  },
  { 
	  title: "Advanced JS", 
	  pages: 500, 
	  author: {
		  name: 'Bob',
		  age: 20
	  },
	  available: true,
	  price: '25€',
	  tags: ['advanced', 'js', 'mid-senior']
  },
  { 
	  title: "CSS Secrets", 
	  pages: 320, 
	  author: {
		  name: 'Alice',
		  age: 17
	  },
	  available: true,
	  price: '8€',
	  tags: ['html', 'css', 'junior']
  },
  { 
	  title: "HTML Mastery", 
	  pages: 200, 
	  author: {
		  name: 'Charlie',
		  age: 50
	  },
	  available: false,
	  price: '48€',
	  tags: ['html', 'advanced', 'junior', 'mid-senior']
  },
];

/*Snack 1 - Filtra e Modifica
Crea una funzione che somma due numeri.
Crea un array (longBooks) con i libri che hanno più di 300 pagine;
Creare un array (longBooksTitles) che contiene solo i titoli dei libri contenuti in longBooks.
Stampa in console ogni titolo nella console. */

function somma(a , b){
  return a + b
}
//Crea un array (longBooks) con i libri che hanno più di 300 pagine;

const longBooks = books.filter(b => b.pages > 300)
console.log(longBooks)
//Creare un array (longBooksTitles) che contiene solo i titoli dei libri contenuti in longBooks.

const longBooksTitles = longBooks.map(l => l.title)
console.log(longBooksTitles)


/*Snack 2 - Il primo libro scontato
Creare un array (availableBooks) che contiene tutti i libri disponibili.
Crea un array (discountedBooks) con gli availableBooks, ciascuno con il prezzo scontato del 20% (mantieni lo stesso formato e arrotonda al centesimo)
Salva in una variabile (fullPricedBook) il primo elemento di discountedBooks che ha un prezzo intero (senza centesimi).*/


//Creare un array (availableBooks) che contiene tutti i libri disponibili.
const availableBooks = books.filter(b => b.available === true)
console.log(availableBooks)

//Crea un array (discountedBooks) con gli availableBooks, ciascuno con il prezzo scontato del 20% (mantieni lo stesso formato e arrotonda al centesimo)

const discountedBooks = availableBooks.map(r =>{  
	
	return ((r.price.replace("€","")/100)*80 )
	.toFixed(2)
	.replace(/$/ , "€")
	
})
/* in questo caso ho usato il metodo replace prima per togliere il simbolo dell'euro per poi fare la divisione
successivamente con toFixed(2) ho arrotondato al centesimo e ritornare una stringa 
con la regex /$/ di replace ho reinserito a tutti i valori di nuovo il simbolo €
*/
console.log(discountedBooks)


//Salva in una variabile (fullPricedBook) il primo elemento di discountedBooks che ha un prezzo intero (senza centesimi).

const fullPricedBook = discountedBooks.find(d => {
	return d
})

console.log(fullPricedBook)

/*Snack 3 - Ordinare gli Autori
Creare un array (authors) che contiene gli autori dei libri.
Crea una variabile booleana (areAuthorsAdults) per verificare se gli autori sono tutti maggiorenni.
Ordina l’array authors in base all’età, senza creare un nuovo array.
(se areAuthorsAdult è true, ordina in ordine crescente, altrimenti in ordine decrescente)*/


//Creare un array (authors) che contiene gli autori dei libri.

const authors = books.map(b => {
	return b.author
})

console.log(authors)

//Crea una variabile booleana (areAuthorsAdults) per verificare se gli autori sono tutti maggiorenni.
//userò il metodo every  che ritorna sempre un valore booleano

const areAuthorsAdults = authors.every(a => a.age > 18)

console.log(areAuthorsAdults)
// mi ritorna come valore un false perchè Alice ha 17 anni quindi è giusto 

/**Ordina l’array authors in base all’età, senza creare un nuovo array.
(se areAuthorsAdult è true, ordina in ordine crescente, altrimenti in ordine decrescente)
Userò il metodo sort che accetta due parametri dato che è tornato un valore false ordinerò l'array in ordine decrescente */

const authorsAge = authors.sort((a , b ) =>{
	return b.age - a.age
}) 

console.log(authorsAge)


/*Snack 4 - Calcola l’età media
Creare un array (ages) che contiene le età degli autori dei libri.

Calcola la somma delle età (agesSum) usando reduce.
Stampa in console l’età media degli autori dei libri.*/


//Creare un array (ages) che contiene le età degli autori dei libri.
const ages = authors.map(a => a.age)
console.log(ages)

//Calcola la somma delle età (agesSum) usando reduce.

const agesSum = ages.reduce((acc , val) =>{ 
	return acc + val //accumulatore parte da 0 e si aggiunge al valore dei vari indici dell'array ages
}, 0)

//Stampa in console l’età media degli autori dei libri.*/

console.log(agesSum / ages.length)


/*Usando la l'API http://localhost:3333/books/{id} usa la combinazione di .map() e Promise.all(), per creare una funzione (getBooks) che a partire da un array di id (ids), ritorna una promise che risolve un array di libri (books).
Testala con l’array [2, 13, 7, 21, 19] .*/

const ids = [2, 13, 7, 21, 19] 
//la mia idea per ora è di ottenere i libri creando un funzione asincrona in cui do in pasto gli id e tramite un map di questì sull'url base ottengo i libri con gli id presenti nell'array
const getBooks = async(ids) =>{
	let dataPromise = []
	const datas =  ids.map(id =>
	fetch(`http://localhost:3333/books/${id}`)
	 	.then(res => res.json())
	 	.then(obj => console.log(obj))
		.catch(err => console.error(err) )
	)
	
	return datas
} 



(async()=>{
	getBooks(ids)
})()
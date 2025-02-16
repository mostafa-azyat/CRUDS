
// get element html in js
let title = document.getElementById('inp-title');
let price = document.getElementById('inp-price');
let taxes = document.getElementById('inp-taxes');
let ads = document.getElementById('inp-ads');
let discount = document.getElementById('inp-discount');
let total = document.getElementById('btn-total');
let count = document.getElementById('inp-count');
let category = document.getElementById('inp-category');
let create = document.getElementById('btn-create');

let mood = 'create';
let tmp;
//get total
function gettotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result + " DH";
        total.style.background = 'green';
    }
    else{
        total.innerHTML = '';
        total.style.background = 'red';
    }

}



//create product
let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}
else{
    dataPro = [];
}

submit.onclick = function(){
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),

    }


    //count
    if(title.value != '' && price.value != '' && category.value != '' && newPro.count < 150){
    if(mood === 'create'){
        if(newPro.count > 1){
            for(let i = 0; i < newPro.count; i++){
                dataPro.push(newPro);
            }
        }else{
        dataPro.push(newPro);
        }  
    }else{
        dataPro[ tmp ] = newPro;
        mood = 'create';
        submit.innerHTML = 'create';
        count.style.display = 'block';

    }   
     clearData()
}
  

    //save localstorege
    localStorage.setItem('product', JSON.stringify(dataPro))
    showData()
}



// clear input
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}



//read
function showData(){
  gettotal();
  let table = '';
  for(let i = 1; i < dataPro.length; i++){
    table += `
    <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})"  id="update">update</button></td>
        <td><button onclick="deleteData( ${i})" id="delete">delete</button></td>                              
    </tr>`
}
   document.getElementById('tbody').innerHTML = table; 
    let btnDelete = document.getElementById('DeleteAll');
    if(dataPro.length > 0){
        btnDelete.innerHTML = `
        <button onclick ="deleteAll()">Delete All (${dataPro.length})</button>
    `}
    else{
        btnDelete.innerHTML = '';
    }
}
showData()
 



//delete
function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product =  JSON.stringify(dataPro);
    showData()
}


//delete all
function deleteAll(){
    localStorage.clear;
    dataPro.splice(0);
    showData()
}




//update
function updateData(i){
    title.value = dataPro[i].title
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    gettotal();
    count.style.display = 'none';
    category.value = dataPro[i].category;
    submit.innerHTML = 'Update';    
    mood = 'update';
    tmp = i;
    scroll({
        top : 0,
        behavior: 'smooth'
    })
}





//search
let searchMood = 'title';

function  getSearchMood(id){

   let search =document.getElementById('inp-search');

   if(id == 'searchTitle'){
        searchMood = 'Title'; 
   }else{
    searchMood = 'Category';
}
    search.style.padding = '5px 5px';
    search.placeholder = 'Search By ' + searchMood;
    search.focus()
    search.value = '';
    showData()
}

function searchData(value){
    let table = '';
    for(let i = 0; i < dataPro.length; i++){
    if(searchMood == 'title'){
            if(dataPro[i].title.includes(value.toLowerCase())){
               table +=
                `<tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})"  id="update">update</button></td>
                <td><button onclick="deleteData( ${i})" id="delete">delete</button></td>                              
            </tr>`
        }
    }else{
            if(dataPro[i].category.includes(value.toLowerCase())){
                   table +=
                    `<tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})"  id="update">update</button></td>
                    <td><button onclick="deleteData( ${i})" id="delete">delete</button></td>                              
                </tr>`

        }
    }}

    document.getElementById('tbody').innerHTML = table; 
} 



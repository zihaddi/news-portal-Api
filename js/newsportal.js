

function addLoader()
{  
  fetch('https://openapi.programming-hero.com/api/news/categories')
  .then(res => res.json())
  .then(headerData => 
    {addToHeaderHTML(headerData.data.news_category);
    
    })
}

addLoader()
const addToHeaderHTML = (categories) =>
{
 // console.log(categories)
  const headerTwo = document.getElementById('headingtwo')
  
  categories.forEach(category => {
    //console.log(category.category_name)
    const listCategory = document.createElement('li')
    listCategory.classList.add('nav-item')
    listCategory.innerHTML = `<button onclick="loadNewsList(${category.category_id})" class="nav-link active text-stone-600 hover:bg-gray-300 hover:text-cyan-600 rounded  "   aria-current="page" href="#">${category.category_name}</button>`//category.category_name
    headerTwo.appendChild(listCategory)
  });
}


function loadNewsList(categoryId)
{
  loadSpinner(true)
  //console.log(categoryId)
  fetch(`https://openapi.programming-hero.com/api/news/category/0${categoryId}`)
  .then(res2 => res2.json())
  .then(categoryList => 
    {
    addcategoryHTML(categoryList.data);
    update(categoryList.data) 
    })
  //.then(categoryList => update(categoryList.data))
}

function addcategoryHTML(categoryList)
{
  //console.log(categoryList)
  categoryList.sort((a,b) => a.total_view - b.total_view)
    if(categoryList == null || categoryList.length == 0)
    {
      itemFound.innerText = `No items found`
    }
    else
    {
      const numberOfcategoryList = categoryList.length;
      const itemFound = document.getElementById('itemFound')
      itemFound.innerText = `${numberOfcategoryList} items found`
      const newRow = document.getElementById('rowItem')
      newRow.innerHTML = ''
      for(const singleCategory of categoryList)
        {
          //console.log(singleCategory)
          const addDiv = document.createElement('div')
          addDiv.classList.add('col-12','d-flex','border','mb-4','bg-white','p-2','rounded')
          addDiv.innerHTML = 
          `
               <div class=" w-25 ">
                <img class="rounded " src=${singleCategory.thumbnail_url} alt="">
               </div>
               <div class="w-75 p-2 m-2">
                   <h2><b>${singleCategory.title}</b></h2><br>
                   <p>${singleCategory.details.slice(0,275)}...</p>
                    <div class="d-flex  justify-content-between  mt-5">
                        <div class="d-flex me-5 ">
                          <img class="rounded" style="height: 50px;" src=${singleCategory.author.img} alt="">
                          <div >
                          <p class="ms-2">${singleCategory.author.name ? singleCategory.author.name:"No Author Found"}</p>
                          <p class="ms-2 " style="color:gray;font-size:15px">${singleCategory.author.published_date ? singleCategory.author.published_date.slice(0,11) : "Not Publish Date Found"}</p>
                          </div>
                        </div>
                        <div class="d-flex align-items-center ms-5 ">
                          <i class="fa-solid fa-eye me-1"></i>
                          <p>${singleCategory.total_view? singleCategory.total_view : "No Data Available"} </p>
                        </div>
                        <div>
                        <button onclick="showDetailed('${singleCategory._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneModal">Show More</button>
                        </div>
                    </div> 
               </div>
          `
          newRow.appendChild(addDiv)
        }
       
    }
    
      loadSpinner(false)
    
     
}



 ///load spinner function 
 function loadSpinner(result)
 {
   const spinner = document.getElementById('loadSpinner')
   if(result)
   {
      spinner.classList.remove('d-none')
   }
   else
   {
     spinner.classList.add('d-none')
   }
 }


 //show details functionality
function showDetailed(code)
{
  fetch(` https://openapi.programming-hero.com/api/news/${code}`)
  .then(res => res.json())
  .then(detailedPhone => modalContent(detailedPhone.data[0]))
}

const modalContent = phoneModalData =>
{
  //console.log(phoneModalData.title)
  const modalHeader = document.getElementById('phoneModalHeader')
  modalHeader.innerHTML = `<h4 style="color:red;"  > Rating :${phoneModalData.rating.number}</h4>
  <h4 style="color:red;"  >Author : ${phoneModalData.author.name ? phoneModalData.author.name : "No Name Found"}</h4>
  `
  const modalBody = document.getElementById('modalBody')
  modalBody.innerHTML =
  `
  <div class="d-flex justify-content-center img-magnifier-container">
  <img id="myimage" src=${phoneModalData.thumbnail_url} >
  </div>
  <p><b>Title :</b>${phoneModalData.title} </p>
  <p><b>Body :</b>${phoneModalData.details}</p>
 
  `

}

function sortingPurpose()
{
  //console.log(categoryList)
  const sortingGuru = document.getElementById('sortingGuru')
  sortingGuru.innerHTML = ''
  const div3 = document.createElement('div')
  div3.innerHTML =
  `<label for="sort" >Sort By View</label>
  <select  id="sort" onchange="update()">
    <option value="default" selected>Default</option>
    <option value="byView">By View</option>
  </select>
  `
  sortingGuru.appendChild(div3)
  const div4 = document.createElement('div')
  div4.innerHTML =
  `
  <button class="btn btn-primary">Todays Pick</button>&nbsp;
  <button class="btn btn-outline-primary">Thending</button>&nbsp;
  `
  sortingGuru.appendChild(div4)
}

sortingPurpose()
// function update(categoryList) {
 
//   var select = document.getElementById('sort');
//   var option = select.options[select.selectedIndex];
//   const sortValue = option.value;
//   if(sortValue == 'default')
//   {
//     console.log(false)
//     //addcategoryHTML(categoryList)
   
//   }
//   else if(sortValue == 'byView')
//   {   
//     console.log(true)
//     //return categoryList.sort((a,b) => a.total_view - b.total_view)
//     categoryList.sort((a,b) => a.total_view - b.total_view)
//    //addcategoryHTML(categoryList)
//   }
//   else
//   {

//   }
// }


const blogButton = document.getElementById('blogButton')
blogButton.addEventListener('click',function()
{
    window.location.href = 'question.html'

})



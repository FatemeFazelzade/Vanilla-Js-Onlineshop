"use strict";

function getThePage() {

  let eachPage = document.body.id;

  switch(eachPage){
      case 'login-page':
          loginToAccount();
          break;
      case 'product-list':
          showProductsPage();
          break;
      case 'add-product-page':
          addProductPage();
          break;
      case 'each-product':
          showProductPage();
          break;
      default:
          console.log('Hello!');
          break;
}

}

//VARIABLES//
const username= document.getElementById('username');
const password=document.getElementById('password');
const productsContainer=document.getElementById('products-container');
const addProductBtn=document.getElementById('add-product-btn');
const theProductName=document.getElementById('name');
const theProductPrice=document.getElementById('price');
const theProductImage=document.getElementById('image');


//PRODUCT ARRAY//
const products=[
  {image:"assets/Lipstick.jpg", name: "Lipstick", price: 100 , moreInfo: "Some info about Lipstick" },
  {image: "assets/primer.jpg", name: "Primer", price: 50  , moreInfo: "Some info about Primer"},
  {image: "assets/Highlighter.jpg", name: "Highlighter", price: 60  , moreInfo: "Some info about Highlighter"},
  {image: "assets/Foundation.jpg", name: "Foundation", price: 90  , moreInfo: "Some info about Foundation"},
  {image: "assets/Lip.jpg", name: "Lip pencil", price: 10  , moreInfo: "Some info about Lip pencil"},
  {image: "assets/Lipgloss.jpeg", name: "Lipgloss", price: 70  , moreInfo: "Some info about Lipgloss"},
  {image: "assets/Eyeliner.jpg", name: "Eyeliner", price: 20  , moreInfo: "Some info about Eyeliner"},
  {image: "assets/shadow.jpg", name: "Eyeshadow", price: 250 , moreInfo: "Some info about Eyeshadow" },
  {image: "assets/Eyelashes.jpg", name: "Eyelashes", price: 150 , moreInfo: "Some info about Eyelashes" },
  {image: "assets/Compactpowder.jpg", name: "Compact powder", price: 80, moreInfo: "Some info about Compact powder"},
  {image: "assets/Concealer.jpg", name: "concealer", price: 90  , moreInfo: "Some info about concealer"},
  {image: "assets/Mascara.jpg", name: "Mascara", price: 85  , moreInfo: "Some info about Mascara"}
]


//SIGN IN//
const logIn = {
  username:"admin",
  password:"admin"
}

function check() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === logIn.username && password === logIn.password) {
    window.location.href = "./index.html";
  } else {
    errorMessage();
  }

//SAVING IN LOCAOL STORAGE//
  window.localStorage.setItem('products',JSON.stringify(products));
}

//ERROR MESSAGE//
function errorMessage() {
  let error = document.getElementById("error")
  if (isNaN(document.getElementById("password").value))
  {
      error.textContent = "Wrong username or password!"
      error.style.color = "red"
  } else {
      error.textContent = ""
  }
}

//GO TO ADD PRODUCT PAGE//
function addProduct() {

        console.log ("Hello!");
        window.location.href='./addproduct.html';

};

//SHOW PRODUCT LIST//
const productsFromStorage = JSON.parse(window.localStorage.getItem('products'));

function showProductsPage() {
    // console.log ("hello!");
  const showProducts = (products) => {
      products.map ( (p) => {
          const products=`
                  <div class="product">
                      <div class="product--delete">
                          <a class="delete-product--btn"><img src="./assets/bin.png"> </a>
                      </div>
                      <div class="product-box">
                          <div class="product--image">
                              <img src="${p.image}" alt=${p.name}>
                          </div>
                          <div class="product--info">
                              <span class="product--name">
                               ${p.name}
                              </span>
                          </div>
                          <div class="products--details">
                              <div class="product--price">
                                  <span> ${p.price} $ </span>
                              </div>
                          </div>
                      </div>
                  </div>`;
                  productsContainer.insertAdjacentHTML('beforeend', products);
      });
      console.log ("Hello!")
  }
showProducts(productsFromStorage);

//DELETE PRODUCT FROM THE LIST//
const deleteProduct=()=>{
    const deleteProductBtn=document.querySelectorAll('.delete-product--btn');
    deleteProductBtn.forEach((deleteBtn,i)=>{
        deleteBtn.addEventListener('click',function(){
            const productsFromLocal=JSON.parse(window.localStorage.getItem('products'));
            if(confirm("Are you sure?")){
                productsFromLocal.splice(i,1);
                window.localStorage.setItem('products',JSON.stringify(productsFromLocal));
                console.log(productsFromLocal);
                window.location.href = "./index.html";
            }
            
        })
    })
}
deleteProduct();


let children=[].slice.call(document.getElementsByClassName('product-box'));
children.forEach((child,i) => {
    child.addEventListener('click',function(){
        window.location.href=`./eachproduct.html?name=${i}`;
    });
    
});
}



//EACH PRODUCT PAGE//
const showProductPage=function(){

    const urlParams=new URLSearchParams(window.location.search);
    const pId=urlParams.get('name');
    const result=JSON.parse(window.localStorage.getItem('products'));
    console.log(result);
    console.log(pId);
    const productFromLStorage=result.find((p,id)=>id==pId);
    const productContainer=document.getElementById('product-container');
    console.log(productFromLStorage);
    const showProductDetails=(productFromLStorage)=>{
       const productDetails=`
            <div class="product--details">
                <div class="product--img">
                    <img src=${productFromLStorage.image} alt=${productFromLStorage.name}>
                </div>
                <div class="product--info">
                    <div class="product--name">
                        <h1><strong>${productFromLStorage.name}</strong></h1>
                    </div>
                    <div class="product--price">
                        <span><strong><span>Price:</span></strong></span>
                        <span>${productFromLStorage.price} $</span>
                    </div>
                </div>
            </div>
            <div class="product--gist">
                    <span><strong>More info:</strong></span>
                    <p>${productFromLStorage.moreInfo}</p>
                </div>
        </div>
        `;
        productContainer.insertAdjacentHTML('afterbegin',productDetails);
    }
    showProductDetails(productFromLStorage);
}

//ADD NEW PRODUCT//
const addProductPage=function(){
        if(theProductName.value && theProductImage.value && theProductPrice.value){
            const productsFromStorage=JSON.parse(window.localStorage.getItem('products'));
        const imgAdress=`./assets/${theProductImage.value.split('\\').slice(-1).join('\\')}`;
        console.log(imgAdress);
        const productsLength=JSON.parse(window.localStorage.getItem('products')).length;
        console.log(productsLength);
        // console.log(productsFromStorage);
        productsFromStorage.push({
            name:theProductName.value,
            price:theProductPrice.value,
            image:imgAdress,
        })
      window.localStorage.setItem('products',JSON.stringify(productsFromStorage));
      console.log(JSON.parse(window.localStorage.getItem('products')));
      alert("Congrats, adding new product was successful!");
      window.location.href = "./index.html";
    };
}



getThePage();
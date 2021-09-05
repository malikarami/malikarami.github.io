const url = window.location.href;
const thisProductId = url.substring(url.lastIndexOf('#')+9);
//console.log(productId);

const addButton = document.getElementsByClassName("move-to-wishlist__button")[0];
addButton.addEventListener('click', addItemToCart);

const removeBut = document.getElementsByClassName("remove__button")[0];
removeBut.addEventListener('click', removeItem);

const getProduct = async () => {
    try{
      const response = await fetch('https://fakestoreapi.com/products/'+thisProductId); 
      if (response.ok){          
        const jsonResponse = await response.json();  
        //console.log(jsonResponse);
        document.querySelector('.product-name').innerHTML = jsonResponse.title;
        document.querySelector('.product-price').innerHTML = jsonResponse.price;
        document.querySelector('.selected-product__image').src = jsonResponse.image;
        return jsonResponse;                          				   
      }
      throw new Error('Request failed!');   
    } catch(error){                            
        console.log(error)             
    }
}


  if(!thisProductId){
    document.querySelector('.product-price').innerHTML = 'no-price';
    document.querySelector('.selected-product__image').src = './media/product.jpeg';
  } else
    getProduct();


function addItemToCart(){
  //loading the items from local storage
  let cart = localStorage.getItem('cart');
  if(cart != null){
    cart = JSON.parse(cart);
  }
  else{
    cart = [];
  }
  //build object 
  let newCartProduct = {productId: 0 , quantity: 0, price: 0};
  newCartProduct.productId = parseInt(thisProductId);
  newCartProduct.price = parseInt(document.querySelector('.product-price').innerHTML);
  newCartProduct.quantity = parseInt(document.querySelector('#quantity__input').value);
  //add this item to local storage
  //todo: import module from shared.js
  let found = false;
  cart.forEach((item) => {
    if(newCartProduct.productId == item.productId){
        item.quantity += newCartProduct.quantity;
        found = true;
        updateShoppingCartDOM(thisProductId, item.quantity, item.price);
    }
  })
  if(!found){
      cart.push(newCartProduct);
      console.log("added prooduct "+ newCartProduct.productId + 'to full');
      addToShoppingCartDOM(thisProductId);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

function removeItem(){
  let cart = JSON.parse(localStorage.getItem('cart'));
  if(cart.length == 0){
    window.alert("the shopping cart is empty");
  }
  let found = false;
  cart.forEach( (e, i) => {
    if( e.productId == thisProductId){
      cart.splice(i, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      found = true;
      return;
    }
  });
  found ? window.alert("item removed from the cart") : window.alert("no such item in the cart");
}
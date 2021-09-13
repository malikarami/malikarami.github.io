const url = window.location.href;
const thisProductId = url.substring(url.lastIndexOf('#')+9);
let thisProduct;

const addButton = document.getElementsByClassName("move-to-wishlist__button")[0];
addButton.addEventListener('click', addThisItemToCart);

const removeBut = document.getElementsByClassName("remove__button")[0];
removeBut.addEventListener('click', removeThisItem);

const getProduct = async () => {
    try{
      const response = await fetch('https://fakestoreapi.com/products/'+thisProductId); 
      if (response.ok){          
        const jsonResponse = await response.json();  
        //console.log(jsonResponse);
        document.querySelector('.product-name').innerHTML = jsonResponse.title;
        document.querySelector('.product-price').innerHTML = jsonResponse.price;
        document.querySelector('.selected-product__image').src = jsonResponse.image;
        thisProduct = jsonResponse;
        return jsonResponse;                          				   
      }
      throw new Error('Request failed!');   
    } catch(error){                            
        console.log(error)             
    }
}

//filling page html when no product is selected
if(!thisProductId){
  document.querySelector('.product-price').innerHTML = 'no-price';
  document.querySelector('.selected-product__image').src = './media/product.jpeg';
} else
  getProduct();


function addThisItemToCart(){
  thisProduct.quantity = parseInt(document.querySelector('#quantity__input').value);
  for( let i = 0 ; i < shoppingCart.length ; i++){
    if(shoppingCart[i].id == thisProductId){
      let newQ = 
        parseInt(shoppingCart[i].quantity) +
        thisProduct.quantity;
      shoppingCart[i].quantity = newQ;
      saveChanges();
      updateTotalPrice();
      window.alert("Product Quantity Increased");
      return;
    }
  }
  //else
  addProductToCart(thisProduct);
  addProductToDOM(thisProduct);
  updateTotalPrice();
  window.alert("Product added to shopping list");
}

function removeThisItem(){
  if(productExists(thisProductId)){
    removeProductFromCart(thisProductId);
    window.alert('Item removed from the list');
  }
  else
    window.alert("Item doesn't exist");
}
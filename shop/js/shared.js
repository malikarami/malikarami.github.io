//local storage management
let userID = localStorage.getItem('user');
if( userID == null){
    userID = 2;
}
if( localStorage.getItem('fetched') == null ){
    localStorage.setItem('fetched', 'false');
}
if( localStorage.getItem('cart') == null ){
    localStorage.setItem('cart', '[]');
}
const shoppingCart = JSON.parse(localStorage.getItem('cart'));


//DOM elements
const hamburgerButton = document.querySelectorAll(".hamburger-button_bar");
const mobileNav = document.querySelector(".mobile-nav");
const closeNav = document.querySelector(".close-nav");
const cartButton = document.querySelector(".header__buy-item");
const closeCart = document.querySelector(".cart__close-button");
const shoppingCartDOM = document.querySelector(".cart");
const productSpace = document.getElementsByClassName("cart__product-wrap")[0];
const shoppingCartTotal = shoppingCartDOM.querySelector('.cart__price span');
const finallizeBuyButton = shoppingCartDOM.querySelector(".cart__buy-items");
const clearCartButton = shoppingCartDOM.querySelector(".cart__delete-items");

//adding listeners
for (let i = 0 ; i < hamburgerButton.length ; i++){
    hamburgerButton[i].addEventListener("click", function (){
        mobileNav.style.display = "block";
    });
}
if (closeNav) {
    closeNav.addEventListener("click", function (){
        mobileNav.style.display = "none";
    })
}
if(cartButton){
    cartButton.addEventListener("click", cartButtonClicked);
}
if(closeCart){
    closeCart.addEventListener("click", () => {
        shoppingCartDOM.style.display = "none";
        cartButton.addEventListener("click", cartButtonClicked);
    })
}
if(finallizeBuyButton){
    finallizeBuyButton.addEventListener('click', finallizeBuy);
}
if(clearCartButton){
    clearCartButton.addEventListener('click', () => {
        if(shoppingCart.length == 0 ){
            window.alert('Cart is empty');
            return;
        }
        if(confirm("Are you sure to execute this action?"))
            clearCart();
    });
}

//function declrations
function cartButtonClicked(){
    cartButton.removeEventListener('click', cartButtonClicked);
    if(shoppingCart.length == 0 && !JSON.parse(localStorage.getItem('fetched'))){
        fetchItems();
        localStorage.setItem('fetched', 'true');
    }
    else{
        reloadDOM();
    }
    shoppingCartDOM.style.display = "grid";
}

function reloadDOM(){
    productSpace.innerHTML = '';
    for( let i = 0 ; i < shoppingCart.length ; i++){
        addProductToDOM(shoppingCart[i]);
    }
    updateTotalPrice();
}

async function fetchItems(){
    try{
        const response = await fetch('https://fakestoreapi.com/carts/user/'+userID); 
        if (response.ok){          
            const jsonResponse = await response.json();
            const cartProducts = jsonResponse[0].products;
            for(let i = 0 ; i < cartProducts.length ; i++){
                let newProductResponse = await fetch('https://fakestoreapi.com/products/'+cartProducts[i].productId);
                if(newProductResponse.ok){
                    let newProduct = await newProductResponse.json();
                    newProduct.quantity = cartProducts[i].quantity;
                    addProductToCart(newProduct);
                    addProductToDOM(newProduct);
                    updateTotalPrice();
                }  
            }                    				   
        } else
            throw new Error('Request failed!');   
    } catch(error){                            
        console.log(error)             
    }
}

function productExists(){
    //if(shoppingCart == 0)
}

function addProductToCart(product){
    shoppingCart.push(product);
    saveChanges();
}

function addProductToDOM(product){
    newProductElement = document.createElement('div')
    newProductElement.innerHTML = `
    <img src="./media/product.jpeg">
    <button class="cart__delete"></button>
    <span class="cart__name"></span>
    <span class="cart__info"><span class="cart__info--price"></span></span>`;
    newProductElement.classList.add("cart__product");
    newProductElement.id = product.id;
    newProductElement.style.display = 'grid';
    newProductElement.querySelector('.cart__info').innerHTML = `${product.quantity}<span class="cart__info--price">${product.price}</span>`;
    newProductElement.querySelector('.cart__name').innerHTML = product.title;
    newProductElement.querySelector('img').src = product.image;
    const dil = newProductElement.querySelector('.cart__delete');
    dil.addEventListener('click', deleteThisItem);
    productSpace.appendChild(newProductElement); 
}

function updateTotalPrice(){
    let total = 0;
    for( let i = 0 ; i < shoppingCart.length ; i++){
        total += parseFloat(shoppingCart[i].price) * parseFloat(shoppingCart[i].quantity);
    }
    shoppingCartTotal.innerHTML = total;
}

function productExists(id){
    for( let i = 0 ; i < shoppingCart.length ; i++){
        if(shoppingCart[i].id == id)
            return true;
    }
    return false;
}

function deleteThisItem(event){
    const targetProduct = event.target.parentElement;
    removeProductFromCart(targetProduct.id);
    setTimeout(() => {productSpace.removeChild(targetProduct)}, 0);
    updateTotalPrice();
}

function saveChanges(){
    localStorage.setItem('cart', JSON.stringify(shoppingCart));
}

function removeProductFromCart(id){
    for( let i = 0 ; i < shoppingCart.length ; i++){
        if(shoppingCart[i].id == id){
            shoppingCart.splice(i, 1);
            saveChanges();
        }
    }
}

function finallizeBuy(){
    if(shoppingCart.length == 0 ){
        window.alert('Cart is empty');
        return;
    }
    //in fact the API must send request to server in order to check quantity
    window.alert(`thank's for buying`);
    clearCart();
}

function clearCart(){
    shoppingCart.length = 0;
    productSpace.innerHTML = '';
    saveChanges();
    updateTotalPrice();
}



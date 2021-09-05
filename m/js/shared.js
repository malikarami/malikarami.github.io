let userId = localStorage.getItem("userId");
if(localStorage.getItem('cart') == null){
    localStorage.setItem('cart', '[]');
}
let localCart = JSON.parse(localStorage.getItem('cart'));
console.log(localCart)
if(!userId){
    userId = 2;
}

let hamburgerButton = document.querySelectorAll(".hamburger-button_bar");
let mobileNav = document.querySelector(".mobile-nav");
let closeNav = document.querySelector(".close-nav");
let cartButton = document.querySelector(".header__buy-item");
let shoppingCart = document.querySelector(".cart");
let closeCart = document.querySelector(".cart__close-button");
const productSpace = document.getElementsByClassName("cart__product-wrap")[0];

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
    cartButton.addEventListener("click", actionOnClick);
}

function actionOnClick(){
    shoppingCart.style.display = "grid";
    cartButton.removeEventListener('click', actionOnClick);
    console.log(productSpace);
    console.log(productSpace.childElementCount)
    if(productSpace.childElementCount <= 0)
        getCartItems();    
}

if(closeCart){
    closeCart.addEventListener("click", () => {
        shoppingCart.style.display = "none";
        cartButton.addEventListener("click", actionOnClick);
    })
}

async function getCartItems(){
    let newCartProduct;
    try{
        const response = await fetch('https://fakestoreapi.com/carts/user/'+userId); 
        if (response.ok){          
            const jsonResponse = await response.json();
            console.log("first fetch successful");
            const newProducts = jsonResponse[0].products;
            for(let i = 0 ; i < newProducts.length ; i++){
                console.log(newProducts[i]);
                newCartProduct = newProducts[i];
                /*let newCartProductPromise = new Promise((resolve, reject) => {
                let response2 = await fetch('https://fakestoreapi.com/products/'+element.productId, {cache: 'no-cache'});
                if(response2.ok)
                resolve(response2.json().price);
                else 
                reject("unsuccessful fetching price")
                })*/
                let response2 = await fetch('https://fakestoreapi.com/products/'+newProducts[i].productId, {cache: 'no-cache'});
                if(response2.ok){
                let temp = await response2.json();
                newCartProduct['price'] = temp.price;
                addNewCartProduct(newCartProduct);
                addToShoppingCartDOM(newCartProduct.productId);
                }  
            }                    				   
        }
        throw new Error('Request failed!');   
    } catch(error){                            
        console.log(error)             
    }
}

function addNewCartProduct(newCartProduct){
    localCart = JSON.parse(localStorage.getItem('cart'));
    cart = [...localCart];
    if(localCart.length == 0){
        cart.push(newCartProduct)
        localStorage.setItem("cart", JSON.stringify(cart));
        console.log("added prooduct "+ newCartProduct.productId + " to empty");
        localCart = JSON.parse(localStorage.getItem('cart'));
        return;
    }
    let found = false;
    localCart.forEach((item) => {
        if(newCartProduct.productId === item.productId){
            item.quantity += newCartProduct.quantity;
            found = true;
        }
    })
    if(!found){
        cart = [...localCart, newCartProduct];
        console.log("added prooduct "+ newCartProduct.productId + 'to full');
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    localCart = JSON.parse(localStorage.getItem('cart'));
    console.log(localCart);
}

async function addToShoppingCartDOM(id){
    const cart = JSON.parse(localStorage.getItem('cart'));
    const template = document.createElement('div');
    template.innerHTML = `
      <img src="./media/product.jpeg">
      <button class="cart__delete"></button>
      <span class="cart__name"></span>
      <span class="cart__info"><span class="cart__info--price"></span></span>`
    template.classList.add("cart__product");
    for(let i = 0; i < cart.length ; i++){
        if( id == cart[i].productId){
            let p = cart[i];
            let clone = template.cloneNode(true);
            clone.id = 'cart__product-'+p.productId;
            clone.style.display = 'grid';
            clone.querySelector('.cart__info').innerHTML = `${p.quantity}<span class="cart__info--price">${p.price}</span>`;
            try{
                const response = await fetch('https://fakestoreapi.com/products/'+p.productId); 
                if (response.ok){                        			   
                  const jsonResponse = await response.json();  
                  clone.querySelector('.cart__name').innerHTML = jsonResponse.title;
                  clone.querySelector('img').src = jsonResponse.image;	
                                                        
                }
                throw new Error('Request failed!');     
              } catch(error){                         
                  console.log(error)                   	
              }
            productSpace.appendChild(clone);
        }
    }
    console.log(productSpace);
}

function testMe(){
    console.log(productSpace); //the element is not live. 
}

function updateShoppingCartDOM(id, q, p){
    let htmlId = 'cart__product-'+id;
    let modifiedElement = document.getElementById(htmlId);
    console.log(modifiedElement);
    modifiedElement.querySelector('.cart__info').innerHTML = `${q}<span class="cart__info--price">${p}</span>`;
}
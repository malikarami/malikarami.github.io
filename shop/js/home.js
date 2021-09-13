const getProducts = async () => {
  try{
    const response = await fetch('https://fakestoreapi.com/products'); 
    if (response.ok){          
      const jsonResponse = await response.json();
      jsonResponse.forEach(p => {
        const pageURL = window.location.href;
        if(pageURL.includes('?')){
          categorize(p, pageURL.substring(pageURL.lastIndexOf('?')+1));
        }
        else addProduct(p);
      });
      return jsonResponse;                          				   
    } else throw new Error('Request failed!');   
  } catch(error){                            
      console.log(error)             
  }
}

getProducts();

class Product {
  constructor(id, image, name, discount, price){
    this.id = id;
    this.image = image;
    this.name = name ;
    this.discount = discount;
    this.price = price;
}
}

function addProduct(product){
  //finding the template element and cloning it
  let template = document.querySelector(".product-wrap");
  let clone = template.cloneNode(true);
  //change the clone attributes
  clone.style.display = 'inline-flex';
  //assign the clone properties
  let cloneProduct = clone.querySelector(".product");
  cloneProduct.id = product.id;
  cloneProduct.querySelector('.product-image').src = product.image;
  cloneProduct.querySelector('.product-info h2').innerHTML = product.name;
  cloneProduct.querySelector('.discount').innerHTML = product.discount;
  cloneProduct.querySelector('.price').innerHTML = product.price;
  cloneProduct.addEventListener("click", function (){
    window.open(`product.html#product-${product.id}`,"_self");
  });
  document.querySelector(".product-wrap > .product > .button-container > .stock-factory").addEventListener("click", function(e) {
    e.stopPropagation();
    e.preventDefault();
    console.log('stock clicked');
    //addThisItemToShoppingCart();
  });
  //console.log(clone);
  document.querySelector(".product-list-wrap").appendChild(clone);
}

function categorize(p, category){
  const electronics = ['tvs', 'computers', 'mobiles', 'electronics'];
  const jewelery = ['jewelery'];
  const clothingMen = ['men'];
  const clothindWomen = ['women'];
  const productCategory = p.category;
  if(jewelery.includes(category) && p.category == 'jewelery'){
    addProduct(p);
  }
  else if(clothingMen.includes(category) && p.category == `men's clothing`){
    addProduct(p);
  }
  else if(clothindWomen.includes(category) && p.category == `women's clothing`){
    addProduct(p);
  }
  else if(electronics.includes(category) && p.category == `electronics`){
    addProduct(p);
  }
}


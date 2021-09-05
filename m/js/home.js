const getProducts = async () => {
  try{
    const response = await fetch('https://fakestoreapi.com/products'); 
    if (response.ok){          
      const jsonResponse = await response.json();
      jsonResponse.forEach(p => {
        addProduct(new Product(p.id, p.image, p.title, p.rating.count, p.price));
        //console.log(p);
      });
      return jsonResponse;                          				   
    }
    throw new Error('Request failed!');   
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
  //console.log(clone);
  document.querySelector(".product-list-wrap").appendChild(clone);
}


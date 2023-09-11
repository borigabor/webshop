/*
  Product

  Create
  Read
  Update
  Delete

  CRUD

*/

const state = {
    products: [
        {
            id: uuidv4(),
            name: "Robinson Crusoe",
            price: 9,
            isInStock: true,
            addToCart: false,
        },
        {
            id: uuidv4(),
            name: "The Witcher Boxed Set",
            price: 27,
            isInStock: false,
            addToCart: false,
        },
        {
            id: uuidv4(),
            name: "The Mamba Mentality",
            price: 16,
            isInStock: true,
            addToCart: false,
        }
    ],
    totalAmount: 0,
    editedId: ''
};

// Update Product

function renderEditProduct() {

    if (state.editedId === '') {
        document.getElementById("edit-proudct-container").innerHTML = "";
        return;
    }

    var foundProduct;

    for(var product of state.products) {
        if (product.id === state.editedId) {
            foundProduct = product;
            break;
        }
    }

    let editFormHTML = `
    <form id="update-product">
        <h6 class="create__product-title">Update product</h6>
        <input type="text" name="name" placeholder="Name" class="product-form__input-field" value="${foundProduct.name}">
        <input type="number" name="price" placeholder="Price" class="product-form__input-field" value="${foundProduct.price}">
        <label class="product-form__checkbox">
            Is in stock?
        <input type="checkbox" name="isInStock" class="checkbox" ${foundProduct.isInStock? 'checked' : ''}>
        </label>
        <button type="submit" class="btn product-form__btn btn-primary--hollow ">Send</button>
    </form>
    `;

    document.getElementById("edit-proudct-container").innerHTML = editFormHTML;

    document.getElementById("update-product").addEventListener("submit", function(event) {

        event.preventDefault();
        const name = event.target.elements.name.value;
        const price = parseInt(event.target.elements.price.value);
        const isInStock = event.target.elements.isInStock.checked;

        for (index = 0; index < state.products.length; index++) {
            if (state.products[index].id === state.editedId) {
                foundIndex = index;
                break;
            }
        }

        state.products[foundIndex] = {
            id: state.editedId,
            name: name,
            price: price,
            isInStock: isInStock,
        }

        state.editedId = '';

        renderProducts();
        renderEditProduct();
        
    })



}

// Search Product




// Read
function renderProducts() {

let productsHTML = '';

for(let product of state.products) {

    productsHTML += `
    <div class="product-card">
        <div class="product-card-header">
            <h6 class="product-name">${product.name}</h6>
        </div>
    <div class="product-card-info">
        <span class="product-text ${product.isInStock ? "" : "unavaible-text"}">${product.isInStock ? "in stock" : "Out of Stock"}</span>
        <span class="product-price ${product.isInStock ? "" : "unavaible-price"}">${product.price}$</span>
        <button class="btn btn-secondary add-product" data-productid="${product.id}">Add to cart</button>
        <button class="btn btn-secondary edit-product" data-productid="${product.id}">update</button>
        <button class="btn btn-secondary delete-product" data-productid="${product.id}">delete</button>
    </div>
    </div>
    `;
}

    document.getElementById("product-list-components").innerHTML = productsHTML;


    // Add To Cart

    for (let product of document.querySelectorAll(".add-product")) {
        product.addEventListener("click", function(event) {

            var id = event.target.dataset.productid;

            var foundIndex = getIndex(id);
    
            if (state.products[foundIndex].isInStock && !state.products[foundIndex].addToCart) {
                state.totalAmount += state.products[foundIndex].price;
                state.products[foundIndex].addToCart = true;
    
                document.getElementById("total-amount").innerHTML = `<span>Total Amount: </span>${state.totalAmount}$`
            }
        })
    }

    document.getElementById("remove-cart").addEventListener("click", function() {
        state.totalAmount = 0;

        for (let product of state.products) {
            product.addToCart = false;
        }

        document.getElementById("total-amount").innerHTML = `your cart is empty`;
    })



   

    // Update Product

    for (let updateBtn of document.querySelectorAll(".edit-product")) {
        updateBtn.addEventListener("click", function(event) {
            
            var id = event.target.dataset.productid;
            state.editedId = id;
            renderEditProduct();
        })
    }

    //Delete Product

    for(let deleteBtn of document.querySelectorAll(".delete-product")) {
        deleteBtn.addEventListener("click", function(event) {
            var id = event.target.dataset.productid;

            var foundIndex = getIndex(id);

            if (state.products[foundIndex].isInStock && state.products[foundIndex].addToCart) {
                state.totalAmount -= state.products[foundIndex].price;
                document.getElementById("total-amount").innerHTML = `<span>Total Amount: </span>${state.totalAmount}$`
            }



            state.products.splice(foundIndex, 1);
            renderProducts();
        })
    }


    // Search Product

    document.getElementById("search-bar").addEventListener("submit", function(event) {

        event.preventDefault();
    
        const searchProduct = event.target.elements.search.value;
        
    
    
        const productsArray = state.products
        .filter((product) => product.name.toLowerCase().includes(searchProduct.toLowerCase()))
        .map((product) => product);
    
    

    
        if (searchProduct === "") {
            renderProducts();
            return;
        }
        
        let searchHTML = '';
    
        for (let product of productsArray) {
    
            searchHTML += `
            <div class="product-card">
            <div class="product-card-header">
                <h6 class="product-name">${product.name}</h6>
            </div>
            <div class="product-card-info">
                <span class="product-text ${product.isInStock ? "" : "unavaible-text"}">${product.isInStock ? "in stock" : "Out of Stock"}</span>
                <span class="product-price ${product.isInStock ? "" : "unavaible-price"}">${product.price}$</span>
                <button class="btn btn-secondary add-product" data-productid="${product.id}">Add to cart</button>
                <button class="btn btn-secondary edit-product" data-productid="${product.id}">update</button>
                <button class="btn btn-secondary delete-product" data-productid="${product.id}">delete</button>
            </div>
        </div>
            `;
    
    
            document.getElementById("product-list-components").innerHTML = searchHTML;
    
        }
    
        
    
    })


};







window.onload = renderProducts();

//Create

document.getElementById("create-product").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const name = event.target.elements.name.value;
    const price = parseInt(event.target.elements.price.value);
    const isInStock = event.target.elements.isInStock.checked;
    

    state.products.push({
        id: uuidv4(),
        name: name,
        price: price,
        isInStock: isInStock,
        addToCart: false
    });

    renderProducts();
   
});


// Get Index

function getIndex(id) {

    var foundIndex;

    for (index = 0; index < state.products.length; index++) {
        if (state.products[index].id === id) {
            foundIndex = index;
            break;
        }
    }

    return foundIndex;

}


// ID 
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
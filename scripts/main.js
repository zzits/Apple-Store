document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartItemsContainer = document.getElementById("ordered-products");
    const filterButtons = document.querySelectorAll(".filter-input")

    let deleteProduct = [];

    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    
    filterButtons.forEach(button => {
        button.addEventListener("click", function(){
            const type = this.getAttribute("id")
            const productsCard = document.querySelectorAll(`div[data-type='${type}']`)
            if (this.checked) {
                productsCard.forEach(card => {
                    card.style.display = "flex"
                })
            }
            else{
                productsCard.forEach(card => {
                    card.style.display = "none"
                })
            }
        })
    })

    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const title = this.getAttribute("data-title");
            const price = this.getAttribute("data-price");
            addToCart(title, price);
    });

    function addToCart(title, price) {
        cartItems.push({ title, price})
        updateCart()
        saveCart();
    }
    });

    function updateCart() {
        
        cartItemsContainer.innerHTML = "";
        cartItems.forEach(item => {
            let listItem = document.createElement("li")
            listItem.innerHTML = `<a href="products/${item.title}/product.html"><img src="products/${item.title}/logo.png"></a><a href="products/${item.title}/product.html"><h3>${item.title}</h3></a>  <span class="price">${item.price}</span><button class="delete-product" title="Прибрати з корзини" data-title="${item.title}"><img src="images/close.svg"></button>`;
            cartItemsContainer.appendChild(listItem);
        });
        deleteProduct = document.querySelectorAll(".delete-product")
        deleteProduct.forEach(button => {
            button.addEventListener("click", function () {
                const title = this.getAttribute("data-title");
                let index = cartItems.findIndex(n => n.title === title)
                if (index !== -1) {
                    cartItems.splice(index, 1);
                }
                updateCart()
                saveCart()
            })
        });
    }

    function saveCart() {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
    
updateCart()

})

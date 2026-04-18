const UI = {
    cart: {
        cartMenu: document.querySelector('.cartMenu'),
        cartBtn: document.querySelector('#cartBtn'),
        cartBtnIcon: document.querySelector('#cartBtnIcon'),
        cartBtnCount: document.querySelector('.cartDivCount'),
        cartMenuClose: document.querySelector('#CMCloseBtn'),
        cartMenuCount: document.querySelector('#CMCount'),
        cartMenuPrice: document.querySelector('#CMPrice'),
        cartResizeBtn: document.querySelector('#sizeBtn'),
    },
    fullCart: {
        fullCartMenu: document.querySelector('.fullCartMenu'),
        fullCloseBtn: document.querySelector('#FCMHCloseBtn'),
        fullCartCount: document.querySelector('#FCMCount'),
        fullCartPrice: document.querySelector('#FCMPrice'),
    },
    pageItems: {
        ListDiv: document.querySelector('.shopList'),
        Wrap: document.querySelector('.wrap'),
    },
}

let dataList = []
let cart = []

axios.get('https://easter-cake.onrender.com/api/pasky')
    .then(res => {
        dataList = res.data
        UI.pageItems.ListDiv.innerHTML = ''
        dataList.forEach(item => {
            const itemCopy = `
                <div class="shopItem">
                    <div class="SIimageDiv">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="SITextDiv">
                        <h3>${item.name}</h3>
                        <h4>${item.price} грн</h3>
                    </div>
                    <div class="SIBtnDiv">
                        <button class="buyBtn" data-id="${item._id}">Купити</button>
                        <button class="descBtn" data-id="${item._id}">Оглянути</button>
                    </div>
                </div>
            `

            UI.pageItems.ListDiv.innerHTML += itemCopy
        })
    })
    .catch(res => {
        console.log(res);
    })

let cartMenuState = false

function cartOpen() {
    cartMenuState = !cartMenuState

    UI.cart.cartMenu.classList.toggle('openMenuSettings')
    UI.cart.cartBtnIcon.classList.toggle('cartBtnStyle')
    UI.cart.cartBtnCount.classList.toggle('cartDisplayStyle')
}

function fullCartOpen() {
    cartMenuState = !cartMenuState

    UI.cart.cartMenu.classList.toggle('openMenuSettings')
    UI.cart.cartBtnIcon.classList.toggle('cartBtnStyle')
    UI.cart.cartBtnCount.classList.toggle('cartDisplayStyle')
    UI.fullCart.fullCartMenu.classList.toggle('openFullMenuSettings')
}

UI.cart.cartBtn.addEventListener('click', cartOpen)
UI.cart.cartMenuClose.addEventListener('click', cartOpen)
UI.cart.cartResizeBtn.addEventListener('click', fullCartOpen)
UI.fullCart.fullCloseBtn.addEventListener('click', fullCartOpen)

function calcTotalPrice() {
    let total = 0
    cart.forEach(element => {
        total += element.product.price * element.quantity
    })
    return (total)
}

UI.pageItems.Wrap.addEventListener('click', function (e) {
    const btn = e.target.closest('.buyBtn');

    if (!btn) return

    let id = btn.dataset.id
    let product = dataList.find(p => p._id === id);
    if (!product) {
        console.error("dumb code");
        return
    }

    let cartItem = cart.find(item => item.product.id === id);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ product: product, quantity: 1 });
    }

    console.log(cart);

    const CartItemsNum = cart.reduce((total, item) => total + item.quantity, 0);

    UI.cart.cartBtnCount.textContent = CartItemsNum
    UI.cart.cartMenuCount.textContent = CartItemsNum
    UI.cart.cartMenuPrice.textContent = `${calcTotalPrice()} грн`

    UI.fullCart.fullCartCount.textContent = CartItemsNum
    UI.fullCart.fullCartPrice.textContent = `${calcTotalPrice()} грн`
})
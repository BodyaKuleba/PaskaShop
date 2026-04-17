const ListDiv = document.querySelector('.shopList')
//https://easter-cake.onrender.com/api/pasky
let dataList = []

axios.get('https://easter-cake.onrender.com/api/pasky')
    .then(res => {
        dataList = res.data
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
                        <button id="${item._id}">Купити</button>
                    </div>
                </div>
            `

            ListDiv.innerHTML += itemCopy
        })
    })
    .catch(res => {
        console.log(res);
    })

const cartMenu = document.querySelector('.cartMenu')
const cartBtn = document.querySelector('#cartBtn')
const cartBtnIcon = document.querySelector('#cartBtnIcon')
const cartDivCount = document.querySelector('.cartDivCount')

let cartMenuState = false

cartBtn.addEventListener('click', (e) => {
    if (cartMenuState == false) {
        cartMenuState = true
    } else {
        cartMenuState = false
    }
    cartMenu.classList.toggle('openMenuSettings')
    cartBtnIcon.classList.toggle('cartBtnStyle')
    cartDivCount.classList.toggle('cartDisplayStyle')
})
const $ = selector => document.querySelector(selector)
const $$ = selector => document.querySelectorAll(selector)

// const $addButton = $('.menu__add-button')
const $cartSummaryEl = $('.cart__summary')
const $cartContainer = $('#cart-container')

// array of objects in which each one is the product, and it contains the name, quantity and unit price for future total calculations
const cart = [
	// {
	//   product: 'product-name',
	//   price: 1.99
	//   quantity: 1
	// }, ...
]

const TAX = 0.0975 //Tennessee sales tax

const updateSummary = () => {
	//* this function should:
	// get all the products, each one quantity and price (from cart array)
	// perform the calculation to get the subtotal (multiply and get summation)
	// display the summary element onto the DOM (cart)

	console.log(cart)
	let subtotal = 0
	let totalTax = 0
	let total = 0
	cart.forEach(product => {
		subtotal += product.price * product.quantity
		totalTax += subtotal * TAX
		// subtotal += Number.parseFloat(product.price * product.quantity)
		// subtotal = product.price + product.quantity
	})

	total += subtotal + totalTax

	$cartSummaryEl.innerHTML = `
    <span class="cart__summary-subtotal">subtotal:</span>
    <p class="cart__summary-subtotal-amount">$${subtotal}</p>
    <span class="cart__summary-tax">tax:</span>
    <p class="cart__summary-tax-amount">$${totalTax.toFixed(2)}</p>
    <span class="cart__summary-total">total:</span>
    <p class="cart__summary-total-amount">$${total.toFixed(2)}</p>
  `

	console.log(subtotal)
}

const addProduct = productInfo => {
	// const productInfo1 = {...productInfo}
	// console.log(productInfo1)

	$cartContainer.innerHTML += `
  <article class="cart__product">
    <img
    src="${productInfo.productImage}"
    alt="${productInfo.productName}"
    class="cart__product-image"
    />
    <span class="cart__product-quantity">1</span>
      <div class="cart__product-summary">
      <p class="cart__product-name">${productInfo.productName}</p>
      <span class="cart__product-unit-price">$${productInfo.productPrice}</span>
      <div class="cart__product-controls">
      <i class="fas fa-chevron-circle-left"></i>
      <span>1</span>
      <i class="fas fa-chevron-circle-right"></i>
      </div>
      <span class="cart__product-total-price">$${productInfo.productPrice}</span>
      </div>
  </article>
  `
}
const increaseProductQuantity = (
	quantity1El,
	productName,
	quantity2El,
	totalPriceEl
) => {
	cart.forEach(el => {
		if (el.product.toLowerCase() === productName.toLowerCase()) {
			el.quantity++
			quantity1El.innerText = el.quantity
			quantity2El.innerText = el.quantity
			let totalPrice = (el.quantity * el.price).toFixed(2)
			totalPriceEl.innerText = `$${totalPrice}`
		}
	})
}

const decreaseProductQuantity = (
	productEl,
	quantity1El,
	productName,
	quantity2El,
	totalPriceEl
) => {
	cart.forEach(el => {
		if (el.product.toLowerCase() === productName.toLowerCase()) {
			el.quantity--
			if (el.quantity > 0) {
				quantity1El.innerText = el.quantity
				quantity2El.innerText = el.quantity
				let totalPrice = (el.quantity * el.price).toFixed(2)
				totalPriceEl.innerText = `$${totalPrice}`
			} else {
				// $cartContainer.remove
				productEl.remove()

				// console.log($$('.menu__product-name'))
				$$('.menu__product-name').forEach(nameEl => {
					if (nameEl.innerText.toLowerCase() === productName.toLowerCase()) {
						nameEl.parentElement
							.querySelector('.menu__add-button')
							.classList.remove('add-product')

						nameEl.parentElement.querySelector(
							'.menu__add-button'
						).innerHTML = `Add to cart`
					}
				})
			}
		}
	})
}

document.addEventListener('click', e => {
	if (e.target.matches('.menu__add-button')) {
		//Get the classes of the current button:
		let classes = e.target.classList.value

		if (classes.includes('add-product')) {
			return
		} else {
			e.target.classList.add('add-product')

			e.target.innerHTML = `<i class="fas fa-check"></i> In Cart`

			let productEl = e.target.parentElement
			//This object will go to the function addProduct() which will add the product to the cart section
			const productInfo = {
				productImage: e.target
					.closest('article')
					.querySelector('.menu__product-image')
					.getAttribute('src'),
				productName: productEl.querySelector('.menu__product-name').innerText,
				productPrice: +productEl
					.querySelector('.menu__product-price')
					.innerText.slice(1),
			}

			//This object will go to the array of products for keeping track of every product amount and total price
			const productQuantity = {
				product: productEl.querySelector('.menu__product-name').innerText,
				price: +productEl
					.querySelector('.menu__product-price')
					.innerText.slice(1),
				quantity: 1,
			}

			cart.push(productQuantity)

			console.log(cart)
			console.log(productEl)
			console.log(productInfo)
			console.log(productQuantity)

			addProduct(productInfo)

			updateSummary()
		}
	}

	//? Event for handling the addition of items
	if (e.target.matches('.cart__product-controls .fa-chevron-circle-right')) {
		const productEl = e.target.closest('article')

		// const quantity1 = productEl.querySelector(
		// 	'.cart__product-quantity'
		// ).textContent

		//getting the first quantity span (the black one) for passing it to the increaseProductQuantity
		const quantity1El = productEl.querySelector('.cart__product-quantity')
		const productName = productEl.querySelector(
			'.cart__product-summary .cart__product-name'
		).innerText
		const quantity2El = productEl.querySelector(
			'.cart__product-summary .cart__product-controls span'
		)
		const totalPriceEl = productEl.querySelector(
			'.cart__product-summary .cart__product-total-price'
		)
		console.log(productEl, quantity1El, productName, quantity2El, totalPriceEl)

		increaseProductQuantity(quantity1El, productName, quantity2El, totalPriceEl)

		updateSummary()
	}

	//? Event for handling the subtraction of items
	if (e.target.matches('.cart__product-controls .fa-chevron-circle-left')) {
		const productEl = e.target.closest('article')

		// const quantity1 = productEl.querySelector(
		// 	'.cart__product-quantity'
		// ).textContent

		//getting the first quantity span (the black one) for passing it to the increaseProductQuantity
		const quantity1El = productEl.querySelector('.cart__product-quantity')
		const productName = productEl.querySelector(
			'.cart__product-summary .cart__product-name'
		).innerText
		const quantity2El = productEl.querySelector(
			'.cart__product-summary .cart__product-controls span'
		)
		const totalPriceEl = productEl.querySelector(
			'.cart__product-summary .cart__product-total-price'
		)
		console.log(productEl, quantity1El, productName, quantity2El, totalPriceEl)

		decreaseProductQuantity(
			productEl,
			quantity1El,
			productName,
			quantity2El,
			totalPriceEl
		)

		updateSummary()
	}
})

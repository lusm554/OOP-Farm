const Barn = new Map()

// Default products are already set
let productRange = {
  milk: [8, 12],
  egg: [0, 1]
}

function random([min, max]) {
  return parseInt(Math.random() * (max - min + 1) + min)
}

function getProduct(type) {
  return random(Barn.get('productRage')[type])
}

// Add methods to Barn
Barn.set('product', getProduct)
Barn.set('productRage', productRange)

class Animal {
  constructor(typeOfProduct) {

    // Add type if it doesn't already exist
    if (Array.isArray(typeOfProduct) && !productRange[typeOfProduct[0]]) {
      productRange[typeOfProduct[0]] = typeOfProduct[1]
      Barn.set('productRage', productRange)
    }

    this.typeOfProduct = Array.isArray(typeOfProduct) ? typeOfProduct[0] : typeOfProduct
    this.id = Barn.size
  }

  save() {
    const isIdAlreadyExist = Barn.get(this.id) !== undefined;
    if (isIdAlreadyExist) {
      throw new Error('Animal id already exist.')
    }

    const typeOfProduct = this.typeOfProduct
    const id = this.id

    Barn.set(id, { id, typeOfProduct })
  }
}

// Add animals to barn
function addDefaultAnimals() {
  for(let i = 0; i < 20; i++) {
    if (i%2 === 0) {
      new Animal('milk').save()
    }
    new Animal('egg').save()
  }
}

function collectProducts() {
  let products = {}

  for(let { id, typeOfProduct } of Barn.values()) {
    if (!id) continue;

    // Animal product
    const product = Barn.get('product')(typeOfProduct)
    !products[typeOfProduct] ? products[typeOfProduct] = product : products[typeOfProduct] += product;
  }

  const log = Object.entries(products).map(([name, val]) => `${name}: ${val}`).join('\n')
  console.log(log)
}

addDefaultAnimals()
collectProducts()

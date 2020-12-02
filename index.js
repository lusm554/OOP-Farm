const Barn = new Map()

class Animal {
  constructor(id) {
    this.id = id
  }

  random(min, max) {
    return parseInt(Math.random() * (max - min + 1) + min)
  }

  save() {
    const isIdAlreadyExist = Barn.get(this.id) !== undefined;
    if (isIdAlreadyExist) {
      throw new Error('Animal id already exist.')
    }

    Barn.set(this.id, this)
    return this
  }
}

class Chicken extends Animal {
  constructor(id) {
    super(id)
    this.type = 'chicken'
  }

  getProduct() {
    return this.random(0, 1)
  }
}

class Cow extends Animal {
  constructor(id) {
    super(id)
    this.type = 'cow'
  }

  getProduct() {
    return this.random(8, 12)
  }
}

// Add animals to barn
function addDefaultAnimals() {
  for(let i = 0; i < 20; i++) {
    if (i%2 === 0) {
      new Cow(Barn.size).save()
    }
    new Chicken(Barn.size).save()
  }
}

function collectProducts() {
  let eggs = 0, litersOfMilk = 0;

  for(let [id, animal] of Barn.entries()) {
    const product = animal.getProduct()

    if (animal.type === 'cow') {
      litersOfMilk += product
    } else {
      eggs += product
    }
  }
  
  console.log(`Eggs: ${eggs}\nLiters of milk: ${litersOfMilk}`)
}

addDefaultAnimals()
collectProducts()

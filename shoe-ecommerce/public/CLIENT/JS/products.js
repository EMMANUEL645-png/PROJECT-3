export const products = [
  { id: "p01", name: "Air Jordan 4 Orange Crackle", price: 185000, category: "jordan", image: "IMAGES/shoes/jordan-4-orange-crackle.jpg" },
  { id: "p02", name: "Air Jordan 4 Royalty", price: 175000, category: "jordan", image: "IMAGES/shoes/jordan-4-royalty-black-gold.jpg" },
  { id: "p03", name: "Air Jordan 4 Military Blue", price: 165000, category: "jordan", image: "IMAGES/shoes/jordan-4-military-blue.jpg" },
  { id: "p04", name: "Air Jordan 4 Neon", price: 150000, category: "jordan", image: "IMAGES/shoes/jordan-4-neon-grey.jpg" },
  { id: "p05", name: "Air Jordan 4 Oxidized Green", price: 145000, category: "jordan", image: "IMAGES/shoes/jordan-4-oxidized-green.jpg" },
  { id: "p06", name: "Air Jordan 4 Infrared", price: 170000, category: "jordan", image: "IMAGES/shoes/jordan-4-infrared.jpg" },
  { id: "p07", name: "Air Jordan 4 Grey Black", price: 130000, category: "jordan", image: "IMAGES/shoes/jordan-4-grey-black.jpg" },
  { id: "p08", name: "Air Jordan 4 KAWS", price: 195000, category: "jordan", image: "IMAGES/shoes/jordan-4-kaws-grey.jpg" },
  { id: "p09", name: "Air Jordan 7 Black Gold", price: 155000, category: "jordan", image: "IMAGES/shoes/jordan-7-black-gold.jpg" },
  { id: "p10", name: "Air Jordan 1 High Dark Mocha", price: 160000, category: "jordan", image: "IMAGES/shoes/jordan-1-high-dark-mocha.jpg" },

  { id: "p11", name: "Nike Dunk Low Navy Mocha", price: 75000, category: "nike", image: "IMAGES/shoes/nike-dunk-low-navy-mocha.jpg" },
  { id: "p12", name: "Nike Shox R4 Black Silver", price: 135000, category: "nike", image: "IMAGES/shoes/nike-shox-r4-black-silver.jpg" },
  { id: "p13", name: "Nike Shox TL Volt", price: 145000, category: "nike", image: "IMAGES/shoes/nike-shox-tl-volt-green.jpg" },
  { id: "p14", name: "Nike Shox TL Bred", price: 150000, category: "nike", image: "IMAGES/shoes/nike-shox-tl-black-red.jpg" },
  { id: "p15", name: "Nike Shox TL Triple Black", price: 148000, category: "nike", image: "IMAGES/shoes/nike-shox-tl-triple-black.jpg" },
  { id: "p16", name: "Nike Air Max 95 Greyscale", price: 168000, category: "nike", image: "IMAGES/shoes/nike-air-max-95-grey-gradient.jpg" },
  { id: "p17", name: "Nike Air Max Plus Gradient", price: 125000, category: "nike", image: "IMAGES/shoes/nike-air-max-plus-black-grey.jpg" },

  { id: "p18", name: "Adidas Samba LT Green", price: 90000, category: "classics", image: "IMAGES/shoes/adidas-samba-lt-green.jpg" },
  { id: "p19", name: "New Balance 740 Black", price: 110000, category: "classics", image: "IMAGES/shoes/new-balance-740-black.jpg" },

  { id: "p20", name: "Retro Training Yellow", price: 95000, category: "street", image: "IMAGES/shoes/retro-training-yellow.jpg" },
  { id: "p21", name: "Retro Star Denim", price: 100000, category: "street", image: "IMAGES/shoes/retro-star-denim.jpg" },
  { id: "p22", name: "Chunky Street Black Gold", price: 70000, category: "street", image: "IMAGES/shoes/chunky-street-black-gold.jpg" },
  { id: "p23", name: "Sport Fashion High-Top", price: 55000, category: "street", image: "IMAGES/shoes/sport-fashion-high-top-black-white.jpg" },
  { id: "p24", name: "Sport Fashion Runner White Red", price: 60000, category: "street", image: "IMAGES/shoes/sport-fashion-runner-white-red.jpg" },
  { id: "p25", name: "Street Runner 23 White Blue", price: 65000, category: "street", image: "IMAGES/shoes/street-runner-23-white-blue.jpg" },
  { id: "p26", name: "Air Cushion Runner White Black", price: 80000, category: "street", image: "IMAGES/shoes/air-cushion-runner-white-black.jpg" }
];

export function getProductById(id) {
  return products.find((p) => p.id === id) || null;
}


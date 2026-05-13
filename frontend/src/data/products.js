const products = [
  {
    id: 1,
    name: 'Premium Corrugated Box',
    price: 1200,
    categoryId: 1,

    img: 'https://t4.ftcdn.net/jpg/04/27/28/25/360_F_427282565_lenAT6VWeKHES8zOuJBdbW1DFrtlIvnt.jpg',

    images: [
      'https://t4.ftcdn.net/jpg/04/27/28/25/360_F_427282565_lenAT6VWeKHES8zOuJBdbW1DFrtlIvnt.jpg',

      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAOhxlG5-6B9bUpbS7pJgz20bMVzb3B5T52w&s',

      'https://5.imimg.com/data5/SELLER/Default/2023/10/355976397/RC/XK/JD/23038962/die-cut-corrugated-packaging-box-500x500.png',

      'https://5.imimg.com/data5/SELLER/Default/2023/9/347814633/BY/YX/UP/4337565/whatsapp-image-2021-01-13-at-18-21-12.jpeg',
    ],

    description:
      'Strong and durable corrugated packaging box suitable for shipping and storage.',

    material: 'Corrugated Paper',
    size: 'Medium',
    stock: 25,
  },
  {
    id: 2,
    name: 'Heavy Duty Shipping Box',
    price: 1500,
    categoryId: 1,
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ9Mx1ICs1craWhfxzz3HULjve875Snh5Ovw&s',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ9Mx1ICs1craWhfxzz3HULjve875Snh5Ovw&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAOhxlG5-6B9bUpbS7pJgz20bMVzb3B5T52w&s',
      'https://5.imimg.com/data5/SELLER/Default/2023/10/355976397/RC/XK/JD/23038962/die-cut-corrugated-packaging-box-500x500.png',
      'https://5.imimg.com/data5/SELLER/Default/2023/9/347814633/BY/YX/UP/4337565/whatsapp-image-2021-01-13-at-18-21-12.jpeg',
    ],
    description:
      'Heavy-duty packaging solution designed for industrial and commercial use.',
    material: 'Heavy Corrugated Board',
    size: 'Large',
    stock: 18,
  },

  {
    id: 3,
    name: 'Double Wall Storage Box',
    price: 1800,
    categoryId: 1,
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn0AWsQIlfy0BkggKpgJIoK4tTO1efHUZY0A&s',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn0AWsQIlfy0BkggKpgJIoK4tTO1efHUZY0A&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcqP-KOvfZky7xVjNMqBxPAUAzsrEUYecSsg&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbUnSXCCMPHRkhxbXUjnRrji9CaFH-ol9-ZA&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRF_wuaCVlmoPrthEgf2NziTwOqwZ0noHwCg&s',
    ],
    description:
      'Double-wall corrugated box offering extra protection for valuable products.',
    material: 'Double Wall Board',
    size: 'Extra Large',
    stock: 12,
  },

  {
    id: 4,
    name: 'Premium Corrugated',
    price: 1200,
    categoryId: 1,
    img: 'https://t4.ftcdn.net/jpg/04/27/28/25/360_F_427282565_lenAT6VWeKHES8zOuJBdbW1DFrtlIvnt.jpg',
    images: [
      'https://t4.ftcdn.net/jpg/04/27/28/25/360_F_427282565_lenAT6VWeKHES8zOuJBdbW1DFrtlIvnt.jpg',
      'https://t4.ftcdn.net/jpg/04/27/28/25/360_F_427282565_lenAT6VWeKHES8zOuJBdbW1DFrtlIvnt.jpg',
      'https://t4.ftcdn.net/jpg/04/27/28/25/360_F_427282565_lenAT6VWeKHES8zOuJBdbW1DFrtlIvnt.jpg',
      'https://t4.ftcdn.net/jpg/04/27/28/25/360_F_427282565_lenAT6VWeKHES8zOuJBdbW1DFrtlIvnt.jpg',
    ],
    description:
      'Premium corrugated packaging designed for secure product delivery.',
    material: 'Corrugated Fiberboard',
    size: 'Medium',
    stock: 20,
  },

  {
    id: 5,
    name: 'Heavy Duty Shipping',
    price: 1500,
    categoryId: 1,
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ9Mx1ICs1craWhfxzz3HULjve875Snh5Ovw&s',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ9Mx1ICs1craWhfxzz3HULjve875Snh5Ovw&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ9Mx1ICs1craWhfxzz3HULjve875Snh5Ovw&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ9Mx1ICs1craWhfxzz3HULjve875Snh5Ovw&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ9Mx1ICs1craWhfxzz3HULjve875Snh5Ovw&s',
    ],
    description:
      'Reliable heavy-duty shipping box for industrial packaging needs.',
    material: 'Industrial Cardboard',
    size: 'Large',
    stock: 15,
  },

  {
    id: 6,
    name: 'Double Wall Storage',
    price: 1800,
    categoryId: 1,
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn0AWsQIlfy0BkggKpgJIoK4tTO1efHUZY0A&s',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn0AWsQIlfy0BkggKpgJIoK4tTO1efHUZY0A&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn0AWsQIlfy0BkggKpgJIoK4tTO1efHUZY0A&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn0AWsQIlfy0BkggKpgJIoK4tTO1efHUZY0A&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn0AWsQIlfy0BkggKpgJIoK4tTO1efHUZY0A&s',
    ],
    description:
      'Durable storage box with double-wall protection for fragile items.',
    material: 'Double Layer Board',
    size: 'XL',
    stock: 10,
  },

  {
    id: 7,
    name: 'Eco Kraft Wrap Roll',
    price: 800,
    categoryId: 2,
    img: 'https://m.media-amazon.com/images/I/61jWD3-09KL._AC_UF894,1000_QL80_.jpg',
    images: [
      'https://m.media-amazon.com/images/I/61jWD3-09KL._AC_UF894,1000_QL80_.jpg',
      'https://m.media-amazon.com/images/I/61jWD3-09KL._AC_UF894,1000_QL80_.jpg',
      'https://m.media-amazon.com/images/I/61jWD3-09KL._AC_UF894,1000_QL80_.jpg',
      'https://m.media-amazon.com/images/I/61jWD3-09KL._AC_UF894,1000_QL80_.jpg',
    ],
    description:
      'Eco-friendly kraft wrapping roll made from recycled materials.',
    material: 'Kraft Paper',
    size: '5m Roll',
    stock: 40,
  },

  {
    id: 8,
    name: 'Recycled Paper Sheets',
    price: 950,
    categoryId: 2,
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqlPZzOi_xGigXrM63pquGATumpsxp86NmkQ&s',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqlPZzOi_xGigXrM63pquGATumpsxp86NmkQ&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqlPZzOi_xGigXrM63pquGATumpsxp86NmkQ&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqlPZzOi_xGigXrM63pquGATumpsxp86NmkQ&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqlPZzOi_xGigXrM63pquGATumpsxp86NmkQ&s',
    ],
    description:
      'High-quality recycled sheets for eco-friendly packaging.',
    material: 'Recycled Paper',
    size: 'A3',
    stock: 30,
  },

  {
    id: 9,
    name: 'Biodegradable Wrap Pack',
    price: 1100,
    categoryId: 2,
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4S81JqAL6ZRqd9-m6cbgCLjQ_xGUI2Yo8Fw&s',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4S81JqAL6ZRqd9-m6cbgCLjQ_xGUI2Yo8Fw&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4S81JqAL6ZRqd9-m6cbgCLjQ_xGUI2Yo8Fw&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4S81JqAL6ZRqd9-m6cbgCLjQ_xGUI2Yo8Fw&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4S81JqAL6ZRqd9-m6cbgCLjQ_xGUI2Yo8Fw&s',
    ],
    description:
      'Biodegradable packaging wraps safe for the environment.',
    material: 'Eco Fiber',
    size: 'Pack of 10',
    stock: 22,
  },

  {
    id: 10,
    name: 'Luxury Gift Box Set',
    price: 2000,
    categoryId: 3,
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz6Fn76U2Btk4ER71Ti3xRHo51sSk7pa1LXA&s',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz6Fn76U2Btk4ER71Ti3xRHo51sSk7pa1LXA&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz6Fn76U2Btk4ER71Ti3xRHo51sSk7pa1LXA&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz6Fn76U2Btk4ER71Ti3xRHo51sSk7pa1LXA&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz6Fn76U2Btk4ER71Ti3xRHo51sSk7pa1LXA&s',
    ],
    description:
      'Elegant luxury gift box set perfect for premium gift packaging.',
    material: 'Premium Cardboard',
    size: 'Gift Set',
    stock: 14,
  },

  {
    id: 11,
    name: 'Premium Ribbon Pack',
    price: 900,
    categoryId: 3,
    img: 'https://m.media-amazon.com/images/I/714vXujAF+L._AC_UF894,1000_QL80_.jpg',
    images: [
      'https://m.media-amazon.com/images/I/714vXujAF+L._AC_UF894,1000_QL80_.jpg',
      'https://m.media-amazon.com/images/I/714vXujAF+L._AC_UF894,1000_QL80_.jpg',
      'https://m.media-amazon.com/images/I/714vXujAF+L._AC_UF894,1000_QL80_.jpg',
      'https://m.media-amazon.com/images/I/714vXujAF+L._AC_UF894,1000_QL80_.jpg',
    ],
    description:
      'Decorative ribbon pack suitable for elegant gift wrapping.',
    material: 'Silk Ribbon',
    size: 'Pack of 20',
    stock: 50,
  },

  {
    id: 12,
    name: 'Decorative Gift Bag Set',
    price: 1300,
    categoryId: 3,
    img: 'https://image.made-in-china.com/202f0j00NEqojpsPZRik/Unique-Design-Foldable-Colorful-Art-Paper-Gift-Bag-Sets-with-Small-Transparent-Windows-and-Bow-Decoration.webp',
    images: [
      'https://image.made-in-china.com/202f0j00NEqojpsPZRik/Unique-Design-Foldable-Colorful-Art-Paper-Gift-Bag-Sets-with-Small-Transparent-Windows-and-Bow-Decoration.webp',
      'https://image.made-in-china.com/202f0j00NEqojpsPZRik/Unique-Design-Foldable-Colorful-Art-Paper-Gift-Bag-Sets-with-Small-Transparent-Windows-and-Bow-Decoration.webp',
      'https://image.made-in-china.com/202f0j00NEqojpsPZRik/Unique-Design-Foldable-Colorful-Art-Paper-Gift-Bag-Sets-with-Small-Transparent-Windows-and-Bow-Decoration.webp',
      'https://image.made-in-china.com/202f0j00NEqojpsPZRik/Unique-Design-Foldable-Colorful-Art-Paper-Gift-Bag-Sets-with-Small-Transparent-Windows-and-Bow-Decoration.webp',
    ],
    description:
      'Stylish decorative gift bags with colorful premium designs.',
    material: 'Art Paper',
    size: 'Set of 5',
    stock: 16,
  },
];

export default products;
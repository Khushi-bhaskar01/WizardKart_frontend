export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  house?: string;
  image: string;
  description: string;
  magicalPower: string;
  rating: number;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Elder Wand Replica',
    price: 299.99,
    category: 'Wands',
    image: 'https://images.pexels.com/photos/8101521/pexels-photo-8101521.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'The most powerful wand ever created. Crafted from elder wood with a Thestral tail hair core.',
    magicalPower: 'Unbeatable in duels',
    rating: 5,
    inStock: true
  },
  {
    id: '2',
    name: 'Gryffindor Quidditch Robe',
    price: 189.99,
    category: 'Robes',
    house: 'GRYFFINDOR',
    image: 'https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Official Gryffindor Quidditch robes worn by the bravest players.',
    magicalPower: '+10 Courage boost',
    rating: 4.8,
    inStock: true
  },
  {
    id: '3',
    name: 'Felix Felicis Potion',
    price: 1499.99,
    category: 'Potions',
    image: 'https://images.pexels.com/photos/8101502/pexels-photo-8101502.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Liquid luck in a bottle. Just one drop and everything goes your way.',
    magicalPower: 'Extreme luck for 12 hours',
    rating: 5,
    inStock: false
  },
  {
    id: '4',
    name: 'Nimbus 2000',
    price: 799.99,
    category: 'Brooms',
    image: 'https://images.pexels.com/photos/6068969/pexels-photo-6068969.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'High-performance racing broom with precision handling.',
    magicalPower: 'Speed: 150 mph',
    rating: 4.7,
    inStock: true
  },
  {
    id: '5',
    name: 'Slytherin House Scarf',
    price: 49.99,
    category: 'Accessories',
    house: 'SLYTHERIN',
    image: 'https://images.pexels.com/photos/8101456/pexels-photo-8101456.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Warm wool scarf in Slytherin house colors.',
    magicalPower: '+5 Cunning enhancement',
    rating: 4.5,
    inStock: true
  },
  {
    id: '6',
    name: 'Ravenclaw Study Set',
    price: 129.99,
    category: 'Books',
    house: 'RAVENCLAW',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Complete collection of advanced magical texts.',
    magicalPower: '+15 Intelligence boost',
    rating: 4.9,
    inStock: true
  },
  {
    id: '7',
    name: 'Hedwig Plush Companion',
    price: 79.99,
    category: 'Magical Creatures',
    image: 'https://images.pexels.com/photos/8101523/pexels-photo-8101523.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Loyal owl companion for message delivery.',
    magicalPower: 'Message delivery anywhere',
    rating: 4.6,
    inStock: true
  },
  {
    id: '8',
    name: 'Hufflepuff Loyalty Ring',
    price: 159.99,
    category: 'Accessories',
    house: 'HUFFLEPUFF',
    image: 'https://images.pexels.com/photos/8101489/pexels-photo-8101489.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Enchanted ring that strengthens bonds of friendship.',
    magicalPower: '+20 Loyalty enhancement',
    rating: 4.4,
    inStock: true
  }
];
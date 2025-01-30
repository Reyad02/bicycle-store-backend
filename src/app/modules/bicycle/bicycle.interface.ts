interface Ibicycle {
  name: string;
  brand: string;
  price: number;
  type: 'Mountain' | 'Road' | 'Hybrid' | 'BMX' | 'Electric';
  description: string;
  quantity: number;
  inStock: boolean;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default Ibicycle;

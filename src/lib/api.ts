import axios from 'axios';
const API_BASE_URL = 'http://localhost:5000/api';

// ----------- Interfaces -----------

interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "seller" | "admin";
  isSeller: boolean;
  sellerApplication?: {
    answers: string[];
    status: "pending" | "approved" | "rejected";
  };
  createdAt: string;
  updatedAt: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: number;
  inStock: boolean;
  magicalPower: string;
  house?: string;
}


export const getProductById = (id: string) => {
  return axios.get<Product>(`/products/${id}`);
};

export const getRelatedProducts = (category: string, productId: string) => {
  return axios.get<Product[]>(`/products/related?category=${category}&exclude=${productId}`);
};
interface CartItem {
  product: Product;
  quantity: number;
}
interface Cart {
  _id: string;
  user: string;
  items: {
    product: string;
    quantity: number;
  }[];
  updatedAt: string;
}

interface Order {
  _id: string;
  user: string;
  items: {
    product: Product;
    quantity: number;
  }[];
  status: "Placed" | "Cancelled" | "Delivered";
  totalAmount: number;
  paymentMode: "Cash On Delivery" | "Online";
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}

// ----------- Class-based API Client -----------

class ApiClient {
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: this.getAuthHeaders(),
      ...options,
    };

    const response = await fetch(url, config);
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  // ---------- Auth ----------
  async register(name: string, email: string, password: string): Promise<{ token: string; user: User }> {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  }

  async login(email: string, password: string): Promise<{ token: string; user: User }> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async getMe(): Promise<User> {
    return this.request('/auth/me');
  }

  // Add this to your ApiClient class
  async applySeller(applicationData: {
    shopName: string;
    description: string;
     why: string;
    }): Promise<{ message: string }> {
    return this.request('/auth/apply-seller', {
    method: 'POST',
    body: JSON.stringify(applicationData),
   });
  }

  // ---------- Products ----------
  async getProducts(): Promise<Product[]> {
    return this.request('/products');
  }

  async getProductById(productId: string): Promise<{ data: Product }> {
    return this.request(`/products/${productId}`);
  }

  async getRelatedProducts(category: string, excludeId: string): Promise<{ data: Product[] }> {
    return this.request(`/products/related?category=${category}&exclude=${excludeId}`);
  }

  async getMyProducts(): Promise<Product[]> {
    return this.request('/products/my-products');
  }

  async addProduct(productData: Omit<Product, '_id' | 'seller' | 'createdAt'>): Promise<Product> {
    return this.request('/products/add', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  async updateProduct(productId: string, productData: Partial<Product>): Promise<Product> {
    return this.request(`/products/update/${productId}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  }

  async deleteProduct(productId: string): Promise<{ message: string }> {
    return this.request(`/products/delete/${productId}`, {
      method: 'DELETE',
    });
  }

  // ---------- Cart ----------
  async getCart(): Promise<{ items: CartItem[] }> {
    return this.request('/cart');
  }

  async addToCart(productId: string, quantity: number = 1): Promise<{ items: CartItem[] }> {
    return this.request('/cart/add', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    });
  }

  async updateCartQuantity(productId: string, quantity: number): Promise<{ items: CartItem[] }> {
    return this.request('/cart/update', {
      method: 'PUT',
      body: JSON.stringify({ productId, quantity }),
    });
  }

  async removeFromCart(productId: string): Promise<{ items: CartItem[] }> {
    return this.request(`/cart/remove/${productId}`, {
      method: 'DELETE',
    });
  }

  async clearCart(): Promise<{ message: string }> {
    return this.request('/cart/clear', {
      method: 'DELETE',
    });
  }

  // ---------- Orders ----------
  async placeOrder(orderData: {
    items: { product: string; quantity: number }[];
    totalAmount: number;
    paymentMode: "Cash On Delivery" | "Online";
  }): Promise<Order> {
    return this.request('/orders/place', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async cancelOrder(orderId: string): Promise<Order> {
    return this.request(`/orders/cancel/${orderId}`, {
      method: 'PUT',
    });
  }

  async getUserOrders(userId: string): Promise<Order[]> {
    return this.request(`/orders/user/${userId}`);
  }

  // ---------- Admin ----------
  async getSellerApplications(): Promise<User[]> {
    return this.request('/admin/seller-applications');
  }

  async approveSeller(userId: string): Promise<{ message: string }> {
    return this.request(`/admin/approve-seller/${userId}`, {
      method: 'POST',
    });
  }

  async rejectSeller(userId: string): Promise<{ message: string }> {
    return this.request(`/admin/reject-seller/${userId}`, {
      method: 'POST',
    });
  }
}

// ---------- Exports ----------

const api = new ApiClient();
export default api;
export {
  API_BASE_URL,
  ApiClient,
  ApiClient as RawApiClient
};
export type { User, Product, CartItem, Cart, Order };

// export const getProductById = (id: string) => {
//   return axios.get(`/products/${id}`);
// };

// export const getRelatedProducts = (category: string, productId: string) => {
//   return axios.get(`/products/related?category=${category}&exclude=${productId}`);
// };
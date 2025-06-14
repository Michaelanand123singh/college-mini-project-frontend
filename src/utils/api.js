const API_BASE_URL = 'http://localhost:5000/api';

// Mock data for development
const mockProducts = [
  {
    id: 1,
    name: 'Adobe Photoshop 2024',
    price: 299,
    category: 'Design',
    description: 'Professional photo editing and graphic design software',
    image: '/api/placeholder/300/200'
  },
  {
    id: 2,
    name: 'Microsoft Office 365',
    price: 149,
    category: 'Productivity',
    description: 'Complete office suite with Word, Excel, PowerPoint',
    image: '/api/placeholder/300/200'
  },
  {
    id: 3,
    name: 'Visual Studio Code Pro',
    price: 199,
    category: 'Development',
    description: 'Advanced code editor with premium features',
    image: '/api/placeholder/300/200'
  },
  {
    id: 4,
    name: 'Norton Antivirus',
    price: 89,
    category: 'Security',
    description: 'Complete antivirus and internet security suite',
    image: '/api/placeholder/300/200'
  },
  {
    id: 5,
    name: 'Adobe Illustrator 2024',
    price: 279,
    category: 'Design',
    description: 'Vector graphics and illustration software',
    image: '/api/placeholder/300/200'
  },
  {
    id: 6,
    name: 'IntelliJ IDEA Ultimate',
    price: 249,
    category: 'Development',
    description: 'Powerful IDE for Java and other languages',
    image: '/api/placeholder/300/200'
  }
];

// API functions
export const getProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
  } catch (error) {
    // Fallback to mock data
    return mockProducts;
  }
};

export const getFeaturedProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/featured`);
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
  } catch (error) {
    // Fallback to mock data
    return mockProducts.slice(0, 3);
  }
};

export const getProduct = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
  } catch (error) {
    // Fallback to mock data
    return mockProducts.find(p => p.id === parseInt(id));
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    if (!response.ok) throw new Error('Login failed');
    return await response.json();
  } catch (error) {
    // Mock successful login for demo
    if (credentials.email && credentials.password) {
      return {
        user: {
          id: 1,
          name: 'Demo User',
          email: credentials.email
        },
        token: 'mock-jwt-token'
      };
    }
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) throw new Error('Registration failed');
    return await response.json();
  } catch (error) {
    // Mock successful registration for demo
    return {
      user: {
        id: Date.now(),
        name: userData.name,
        email: userData.email
      },
      token: 'mock-jwt-token'
    };
  }
};

export const createOrder = async (orderData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    
    if (!response.ok) throw new Error('Order creation failed');
    return await response.json();
  } catch (error) {
    // Mock successful order for demo
    return {
      id: Date.now(),
      status: 'completed',
      ...orderData
    };
  }
};
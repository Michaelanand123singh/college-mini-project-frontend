import React, { useState, useEffect } from 'react';
import { orderService } from '../services/orderService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { formatDate, formatCurrency } from '../utils/formatters';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderService.getAll();
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Order History</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No orders found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-6 rounded-lg shadow border">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold">Order #{order._id.slice(-8)}</h3>
                  <p className="text-gray-600">{formatDate(order.createdAt)}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{formatCurrency(order.total)}</p>
                  <p className={`text-sm ${
                    order.status === 'delivered' ? 'text-green-600' : 
                    order.status === 'shipped' ? 'text-blue-600' : 'text-yellow-600'
                  }`}>
                    {order.status}
                  </p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Items:</h4>
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm mb-1">
                    <span>{item.product.name} x{item.quantity}</span>
                    <span>{formatCurrency(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
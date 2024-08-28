import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [pendingReviews, setPendingReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const productsResponse = await fetch('/api/products', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const productsData = await productsResponse.json();
      setProducts(productsData);

      const reviewsResponse = await fetch('/api/reviews?status=pending', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const reviewsData = await reviewsResponse.json();
      setPendingReviews(reviewsData);
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Products</h2>
          <ul className="space-y-2">
            {products.map(product => (
              <li key={product._id}>
                <Link href={`/product/${product._id}`}>
                  <a className="text-blue-500 hover:underline">{product.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Pending Reviews</h2>
          <ul className="space-y-2">
            {pendingReviews.map(review => (
              <li key={review._id}>
                <Link href={`/pending-requests/${review._id}`}>
                  <a className="text-blue-500 hover:underline">Review for {review.productId}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
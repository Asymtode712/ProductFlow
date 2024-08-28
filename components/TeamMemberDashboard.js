import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const TeamMemberDashboard = () => {
  const [products, setProducts] = useState([]);
  const [mySubmissions, setMySubmissions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const productsResponse = await fetch('/api/products', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const productsData = await productsResponse.json();
      setProducts(productsData);

      const submissionsResponse = await fetch('/api/reviews/my-submissions', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const submissionsData = await submissionsResponse.json();
      setMySubmissions(submissionsData);
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Team Member Dashboard</h1>
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
          <h2 className="text-xl font-semibold mb-2">My Submissions</h2>
          <ul className="space-y-2">
            {mySubmissions.map(submission => (
              <li key={submission._id}>
                <Link href={`/profile/my-submissions/${submission._id}`}>
                  <a className="text-blue-500 hover:underline">
                    {submission.productId} - {submission.status}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberDashboard;
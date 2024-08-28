
'use client';

import { useState, useEffect } from 'react';
import AdminDashboard from '../../components/AdminDashboard';
import TeamMemberDashboard from '../../components/TeamMemberDashboard';

export default function Dashboard() {
  const [userRole, setUserRole] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await fetch('/api/user', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch user role: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const userData = await response.json();
        setUserRole(userData.role);
      } catch (err) {
        console.error('Error fetching user role:', err);
        setError(err.message);
      }
    };

    fetchUserRole();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!userRole) return <div>Loading...</div>;

  return (
    <div>
      {userRole === 'admin' ? <AdminDashboard /> : <TeamMemberDashboard />}
    </div>
  );
}
import { connectToDatabase } from '@/lib/mongodb';
import { verifyToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const token = request.headers.get('authorization')?.split(' ')[1];
  if (!token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  try {
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { db } = await connectToDatabase();
    
    const totalRequests = await db.collection('reviews').countDocuments({ createdBy: decoded.userId });
    const approvedRequests = await db.collection('reviews').countDocuments({ createdBy: decoded.userId, status: 'approved' });
    const rejectedRequests = await db.collection('reviews').countDocuments({ createdBy: decoded.userId, status: 'rejected' });
    const pendingRequests = await db.collection('reviews').countDocuments({ createdBy: decoded.userId, status: 'pending' });

    return NextResponse.json({
      totalRequests,
      approvedRequests,
      rejectedRequests,
      pendingRequests
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
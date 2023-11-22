import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

const TrainingLogs = () => {
  const router = useRouter();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Check if token exists in cookies
    const cookies = cookie.parse(document.cookie);
    const token = cookies.token;

    if (!token) {
      router.push('/login'); // Redirect to login if token doesn't exist
    } else {
      try {
        // Verify the token
        const decoded = jwt.verify(token, 'secret_key');
        const { userId } = decoded;
        setUserId(userId); // Set user ID to state
      } catch (error) {
        console.error('Token verification failed:', error);
        router.push('/login'); // Redirect to login on token verification failure
      }
    }
  }, []);

  return (
    <div>
      {userId ? <h1>User ID: {userId}</h1> : <p>Loading...</p>}
      {/* Display user ID if logged in, or a loading message */}
    </div>
  );
};

export default TrainingLogs;
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Custom500 = () => {
  const router = useRouter();

  useEffect(() => {
    //router.push('/');
  }, []);

  return null;
};

export default Custom500;

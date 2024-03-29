import { useRouter } from 'next/router';

export default function Custom500() {
  const router = useRouter();
  return router.push('/');
}

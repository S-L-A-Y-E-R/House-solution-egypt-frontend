import { useRouter } from 'next/router';

export default function Custom404() {
  const router = useRouter();
  return router.push('/');
}

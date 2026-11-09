import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PersonStandingIcon } from 'lucide-react';

export default function LandingPage() {
  return (
    <>
      <h1 className="flex gap-2 items-center">
        <PersonStandingIcon
          size={48}
          className="text-primary"
        />
        Support me
      </h1>
      <p>The best dashboard to manage customer support</p>
      <div className="flex gap-4 items-center">
        <Button
          nativeButton={false}
          render={<Link href="/login" />}>
          Log in
        </Button>
        <small>or</small>
        <Button
          nativeButton={false}
          render={<Link href="/sign-up" />}
          variant="outline">
          Sign up
        </Button>
      </div>
    </>
  );
}

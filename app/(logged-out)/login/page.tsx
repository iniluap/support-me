'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { PersonStandingIcon } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <>
      <PersonStandingIcon
        size={48}
        className="text-primary"
      />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to your SupportMe account</CardDescription>
        </CardHeader>
        <CardContent>login form</CardContent>
        <CardFooter className="justify-between">
          <p>Don&apos;t have an account?</p>
          <Button
            nativeButton={false}
            variant={'outline'}
            size={'sm'}
            render={<Link href="/signup" />}>
            Sign up
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

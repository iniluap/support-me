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
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  email: z.email()
});

export default function SignUpPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ''
    }
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    console.log(values, 'validation passed');
  }

  return (
    <>
      <PersonStandingIcon
        size={48}
        className="text-primary"
      />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>Sign up for a new SupportMe account</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="login-form"
            onSubmit={form.handleSubmit(handleSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="anna@example.com"
                      autoComplete="on"
                      type="email"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Field orientation="horizontal">
                <Button type="submit">Sign up</Button>
                <Button
                  nativeButton={false}
                  variant={'secondary'}
                  render={<Link href="/" />}>
                  Cancel
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="justify-between">
          <p>Already have an account?</p>
          <Button
            nativeButton={false}
            variant={'outline'}
            size={'sm'}
            render={<Link href="/login" />}>
            Log in
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

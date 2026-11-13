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
import { CalendarIcon, PersonStandingIcon } from 'lucide-react';
import Link from 'next/link';
import { useForm, useWatch, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
  FieldDescription,
  FieldContent
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const formSchema = z
  .object({
    email: z.email(),
    accountType: z.enum(['personal', 'company']),
    companyName: z.string().optional(),
    employeesNumber: z.coerce.number().optional(),
    dob: z
      .date({ error: 'Please select your date of birth' })
      .refine((date) => {
        const today = new Date();
        const eighteenYearsAgo = new Date(
          today.getFullYear() - 18,
          today.getMonth(),
          today.getDate()
        );
        return date <= eighteenYearsAgo;
      }, 'You must be at least 18 years old'),
    password: z.string().min(8, 'Password has to have minimum 8 characters'),
    confirmPassword: z.string(),
    acceptTerms: z
      .boolean({
        error: 'You must accept the terms and conditions'
      })
      .refine((checked) => checked, 'You must accept the terms and conditions')
  })
  .superRefine((data, ctx) => {
    if (data.accountType === 'company' && !data.companyName) {
      ctx.addIssue({
        code: 'custom',
        path: ['companyName'],
        message: 'Company name is required'
      });
    }

    if (
      data.accountType === 'company' &&
      (!data.employeesNumber || data.employeesNumber < 1)
    ) {
      ctx.addIssue({
        code: 'custom',
        path: ['employeesNumber'],
        message: 'Number of employees is required'
      });
    }

    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirmPassword']
      });
    }
  });

export default function SignUpPage() {
  const [open, setOpen] = React.useState(false);

  const form = useForm<
    z.input<typeof formSchema>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    z.output<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      accountType: 'personal',
      companyName: '',
      employeesNumber: 0,
      dob: undefined,
      password: '',
      confirmPassword: ''
    }
  });

  const { register } = useForm();
  const accountType = useWatch({
    control: form.control,
    name: 'accountType'
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
              {/* Email field */}
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
              {/* Account type field */}
              <Controller
                name="accountType"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Account type</FieldLabel>
                    <Select
                      {...register('field')}
                      id={field.name}
                      value={field.value}
                      onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an account type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="personal">personal</SelectItem>
                        <SelectItem value="company">company</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
              {accountType === 'company' && (
                <>
                  {/* Company name field */}
                  <Controller
                    name="companyName"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          Company name
                        </FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="Company name"
                          autoComplete="on"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  {/* No of employees field */}
                  <Controller
                    name="employeesNumber"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          Number of employees
                        </FieldLabel>
                        <Input
                          {...field}
                          value={field.value as string | number}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          type="number"
                          min={0}
                          placeholder="Number of employees"
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </>
              )}
              {accountType === 'personal' && (
                <>
                  {/* Date of birth field */}
                  <Controller
                    name="dob"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        id={field.name}>
                        <FieldLabel htmlFor={field.name}>
                          Date of birth
                        </FieldLabel>
                        <Popover
                          open={open}
                          onOpenChange={setOpen}>
                          <PopoverTrigger
                            render={
                              <Button
                                variant="outline"
                                id="date"
                                className="px-0 border-transparent border-b-input justify-between font-normal normal-case tracking-normal text-sm">
                                {field.value ? (
                                  field.value.toLocaleDateString()
                                ) : (
                                  <span
                                    data-placeholder
                                    className="data-placeholder:text-muted-foreground">
                                    Select date
                                  </span>
                                )}
                                <CalendarIcon />
                              </Button>
                            }
                          />
                          <PopoverContent
                            className="w-auto overflow-hidden p-0"
                            align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              defaultMonth={field.value}
                              captionLayout="dropdown"
                              fixedWeeks
                              weekStartsOn={1}
                              disabled={{ after: new Date() }}
                              onSelect={(selected) => {
                                field.onChange(selected);
                                setOpen(false);
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </>
              )}
              {/* Password field */}
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      placeholder="abcd1234"
                      type="password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {/* Confirm password field */}
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      placeholder="abcd1234"
                      type="password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {/* Terms & conditions field */}
              <Controller
                name="acceptTerms"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    orientation="horizontal"
                    data-invalid={fieldState.invalid}>
                    <Checkbox
                      {...register('field')}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="accept-terms"
                    />
                    <FieldContent>
                      <Label htmlFor="accept-terms">
                        Accept terms and conditions
                      </Label>
                      <FieldDescription>
                        By clicking this checkbox, you agree to the terms and
                        conditions.
                      </FieldDescription>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />
              {/* Submit */}
              <Field>
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

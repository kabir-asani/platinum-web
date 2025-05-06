"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { betterAuthClient } from "@/lib/integrations/better-auth";
import { emailSchema } from "@/lib/extras/schemas/email";
import { passwordSchema } from "@/lib/extras/schemas/password";
import { nameSchema } from "@/lib/extras/schemas/name";
import { Caption } from "@/components/ui/caption";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export const SignUpCard = () => {
  const router = useRouter();

  const [signUpError, setSignUpError] = useState<Error | null>(null);

  const { Field, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      termsAndConditionsChecked: true,
    },
    onSubmit: async (value) => {
      const { name, email, password } = value.value;
      const { error } = await betterAuthClient.signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        setSignUpError(new Error("Unable to sign up currently"));
        return;
      }

      router.replace("/feed");
    },
  });

  return (
    <Card className="w-md">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Enjoy Platinum at its best!</CardDescription>
      </CardHeader>

      <Separator />

      <CardContent>
        <form
          className="flex flex-col items-stretch gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit();
          }}
        >
          {/* Name Field */}
          <Field
            name="name"
            validators={{
              onSubmit: (value) => {
                const { error } = nameSchema.safeParse(value.value);

                if (error && error.errors.length > 0) {
                  return error.errors[0].message;
                }
              },
            }}
          >
            {(field) => {
              return (
                <div className="flex flex-col items-stretch gap-2">
                  <Label htmlFor={field.name}>Name</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    type="text"
                    placeholder="Name"
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors?.length > 0 && (
                    <Caption variant="error">{field.state.meta.errors.join(" | ")}</Caption>
                  )}
                </div>
              );
            }}
          </Field>

          {/* Email Field */}
          <Field
            name="email"
            validators={{
              onSubmit: (value) => {
                const { error } = emailSchema.safeParse(value.value);

                if (error && error.errors.length > 0) {
                  return error.errors[0].message;
                }
              },
            }}
          >
            {(field) => {
              return (
                <div className="flex flex-col items-stretch gap-2">
                  <Label htmlFor={field.name}>Email</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    type="email"
                    placeholder="Email"
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors?.length > 0 && (
                    <Caption variant="error">{field.state.meta.errors.join(" | ")}</Caption>
                  )}
                </div>
              );
            }}
          </Field>

          {/* Password Field */}
          <Field
            name="password"
            validators={{
              onSubmit: (value) => {
                const { error } = passwordSchema.safeParse(value.value);

                if (error && error.errors.length > 0) {
                  return error.errors[0].message;
                }
              },
            }}
          >
            {(field) => {
              return (
                <div className="flex flex-col items-stretch gap-2">
                  <Label htmlFor={field.name}>Password</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    type="password"
                    placeholder="Password"
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors?.length > 0 && (
                    <Caption variant="error">{field.state.meta.errors.join(" | ")}</Caption>
                  )}
                </div>
              );
            }}
          </Field>

          <Field
            name="termsAndConditionsChecked"
            validators={{
              onSubmit: (value) => {
                if (!value.value) {
                  return "You've to agree to our Terms of Service and Privacy Policy";
                }
              },
            }}
          >
            {(field) => {
              return (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={field.name}
                    name={field.name}
                    checked={field.state.value}
                    onBlur={field.handleBlur}
                    onCheckedChange={(e) => {
                      if (e !== "indeterminate") {
                        field.handleChange(e);
                      } else {
                        field.handleChange(false);
                      }
                    }}
                  />
                  <label
                    htmlFor="terms"
                    className={cn(
                      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                      field.state.meta.errors.length > 0 && "text-destructive",
                    )}
                  >
                    Accept terms and conditions
                  </label>
                </div>
              );
            }}
          </Field>

          <Button type="submit">Sign Up</Button>
        </form>
      </CardContent>

      <Separator />

      {signUpError !== null && (
        <>
          <CardContent>
            <Caption variant="error">{signUpError.message}</Caption>
          </CardContent>
          <Separator />
        </>
      )}

      <CardContent>
        Already have an account?{" "}
        <Link href="/log-in" className="underline underline-offset-4">
          Log in
        </Link>
      </CardContent>
    </Card>
  );
};

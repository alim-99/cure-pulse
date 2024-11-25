"use client"

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { UserFormValidation } from '@/lib/validation'
import Image from 'next/image'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormField, { FormFieldType } from './CustomFormField'
import SubmitButton from './SubmitButton'
import { useRouter } from 'next/navigation'
import { createUser } from '@/lib/actions/patient.actions'
const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
    const form = useForm<z.infer<typeof UserFormValidation>>({
      resolver: zodResolver(UserFormValidation),
      defaultValues: {
        name: "",
        email: "",
        phone: ""
      },
    })
  
    const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
      setIsLoading(true);
  
      try {
        const user = {
          name: values.name,
          email: values.email,
          phone: values.phone,
        };
  
        const newUser = await createUser(user);
  
        if (newUser) {
          router.push(`/patients`);
        }
      } catch (error) {
        console.log(error);
      }
  
      setIsLoading(false);
    };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex-1">
        <CustomFormField 
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name="name"
        label="Full name"
        placeholder="John Doe"
        iconSrc="/user.svg"
        iconAlt="user"
        />
        <CustomFormField
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name="email"
        label="Email Address"
        placeholder="example@.com"
        iconSrc="/email.svg"
        iconAlt="user"
        />
        <CustomFormField
        fieldType={FormFieldType.PHONE_INPUT}
        control={form.control}
        name="phone"
        label="Phone Number"
        placeholder="+00 0342 0453 34"
        iconSrc="/icon.svg"
        iconAlt="user"
        />
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  )
}
export default PatientForm

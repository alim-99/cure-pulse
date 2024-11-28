"use client"

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from 'next/image'

import {
  Form,
} from "@/components/ui/form"

import CustomFormField, { FormFieldType } from '../CustomFormField'
import SubmitButton from '@/components/SubmitButton'
import { useRouter } from 'next/navigation'
import { SelectItem } from '../ui/select'
import { Doctors } from '@/constants'
import MainFormContainer from '../MainFormContainer'
import {  getAppointmentSchema } from '@/lib/validation'
import { createAppointment } from '@/lib/actions/appointment.actions'

const NewAppointmentForm = ({userId, patientId, type}: 
  {userId: string, patientId: string, type: 'create' | 'cancel' | 'schedule'}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: "",
      schedule: new Date(),
      reason: "",
      note:  "",
      cancellationReason: "",
    },
  });
  
    const onSubmit = async (values: z.infer<typeof AppointmentFormValidation>) => {
      setIsLoading(true);

      let status;
      switch(type) {
        case 'schedule':
          status = 'scheduled';
          break;
        case 'cancel':
          status = 'cancelled';
          break;
        default:
          status = 'pending';
          break;
      }

      console.log(type)
  
      try {
        if(type === 'create' && patientId) {
          console.log('hiii')

          const appointmentData = {
            userId,
            patient: patientId,
            primaryPhysician: values.primaryPhysician,
            schedule: new Date(values.schedule),
            reason: values.reason!,
            status: status as Status,
            note: values.note,
          };
  
          const appointment = await createAppointment(appointmentData);

          console.log(appointment.$id);
          if (appointment) {
            form.reset();
            router.push(`/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`);
          }
        }

      } catch (error:any) {
        throw new Error('Something went wrong', error.message);
      }
  
      setIsLoading(false);
    };

    let btnLabel;

    switch(type) {
      case 'cancel': 
      btnLabel = 'Cancel Appointment';
      break;
      case 'create':
      btnLabel = 'Create Appointment';
      break;
      case 'schedule':
      btnLabel = 'Schedule Appointment';
      break;

      default: 
      break;
    }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex-1">

        <section className="space-y-4">
          <h1 className="header text-white">New Appointment</h1>
          <p className="text-dark-700">Request a new appointment in 10 seconds</p>
        </section>

        {type !== 'cancel' && (
          <>
            <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Doctor"
            placeholder="Select a doctor"
          >
            {Doctors.map((doctor, i) => (
              <SelectItem  className="text-white" key={doctor.name + i} value={doctor.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt="doctor"
                    className="rounded-full border border-dark-500"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
            </CustomFormField>

            <CustomFormField 
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name='schedule'
            label='Expected appointment date'
            showTimeSelect
            dateFormat='MM/dd/yyy - h:mm aa'
            />

            <MainFormContainer>
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="reason"
              label="Reason for appointment"
              placeholder="ex: Annual montly check-up"
            />

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="note"
              label="Additional comments/notes"
              placeholder="ex: Prefer afternoon appointments, if possible"
            />
            </MainFormContainer>

          </>
        )}

        {type === 'cancel' && (
          <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="cancellationReason"
          label="Reason for cancellation"
          placeholder="Enter reason for cancellation"
          />
        )}

        <SubmitButton isLoading={isLoading} className={`${type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'} w-full`}>{btnLabel}</SubmitButton>
      </form>
    </Form>
  )
}

export default NewAppointmentForm

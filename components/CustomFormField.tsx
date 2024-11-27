import React, { useState } from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'

import { Control, FieldPath } from 'react-hook-form'
import { z } from 'zod'
import Image from 'next/image'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import { Checkbox } from './ui/checkbox'

export enum FormFieldType {
  INPUT= "input",
  TEXTAREA="textarea",
  PHONE_INPUT= 'phoneInput',
  CHECKBOX = 'checkbox',
  DATE_PICKER = 'datePicker',
  SELECT = 'select',
  SKELETON = 'skeleton'
}

interface CustomProps {
  control: Control<any>,
  fieldType: FormFieldType,
  name: string,
  label?: string,
  placeholder?: string,
  iconSrc?: string,
  iconAlt?: string,
  disabled?: boolean,
  dateFormat?: string,
  showTimeSelect?: boolean,
  children?: React.ReactNode,
  renderSkeleton?: (field: any) => React.ReactNode
}

const RenderField = ({field, props}: {field: any, props: CustomProps}) => {
  const {fieldType, iconSrc, iconAlt, placeholder, showTimeSelect, dateFormat, renderSkeleton} = props;


  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className='flex rounded-md border border-dark-500 bg-dark-400'>
          {iconSrc && (
            <Image 
            src={iconSrc}
            height={24}
            width={24}
            alt={iconAlt || "icon"}
            className='ml-2'
            />
          )}

          <FormControl className='text-white'>
            <Input 
            placeholder={placeholder}
            {...field}
            className='shad-input border-0'
            />
          </FormControl>
        </div>
      )
      break;
    case FormFieldType.PHONE_INPUT:
        return (
          <FormControl className='text-slate-400'>
            <PhoneInput
            defaultCountry='US'
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className='input-phone'
            />
          </FormControl>
      )
    case FormFieldType.DATE_PICKER:
      return (
        <div className='flex rounded-md w-40 border border-dark-500 bg-dark-400'>
          <Image
          src="/calendar.svg" 
          alt='calendar'
          width={24}
          height={24}
          className='ml-2'
          />
          <FormControl className='text-white'>
          <DatePicker 
          selected={field.value} 
          onChange={(date) => field.onChange(date)}
          dateFormat={dateFormat ?? 
            'mm/dd/yyy'
          }
          showTimeSelect={showTimeSelect ?? 
            false
          }
          timeInputLabel='Time:'
          wrapperClassName='date-picker'
          placeholderText='Your birth'
          />
          </FormControl>
        </div>
      )
    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange}
          defaultValue={field.value}>
            <FormControl className='text-white'>
              <SelectTrigger className='shad-select-trigger'>
              <SelectValue className='text-white' placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className='shad-select-content'>
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      )
    case FormFieldType.TEXTAREA:
      return (
          <FormControl className='text-white'>
          <Textarea
          placeholder={placeholder}
          {...field}
          className='shad-textArea'
          disabled={props.disabled}
          />
          </FormControl>
      )
      case FormFieldType.CHECKBOX:
        return (
          <FormControl className='text-[#0C1132]'>
            <div className="flex items-center gap-4">
              <Checkbox
                id={props.name}
                checked={field.value}
                onCheckedChange={field.onChange}
                className='gradient'
              />
              <label htmlFor={props.name} className="checkbox-label">
                {props.label}
              </label>
            </div>
          </FormControl>
        );
  }
  
}

const CustomFormField = (props: CustomProps) => {
  const { control, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {props.fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className="shad-input-label">{label}</FormLabel>
          )}
          <RenderField field={field} props={props} />

          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
"use client";
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components';

const Login = () => {
  const [loginData, setLoginData] = useState<any>(null);
  const [validationSchema, setValidationSchema] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/pages')
      .then((response) => response.json())
      .then((data) => {
        setLoginData(data);
        setValidationSchema(createValidationSchema(data[0].sections[1].components[0].fields) as any);
      })
      .catch((error) => console.error(error));
  }, []);

  const createValidationSchema = (fields: any) => {
    const schemaFields: any = {};

    fields.forEach((field: any) => {
      let validationChain: any;
      if (field.type === 'date') {
        validationChain = yup.date();
      } else {
        validationChain = yup.string();
      }

      if (field.required) {
        validationChain = validationChain.required('This field is required.');
      }

      if (field.validations) {
        field.validations.forEach((validation: any) => {
          if (validation.type === 'minLength') {
            validationChain = validationChain.min(validation.value, validation.message);
          } else if (validation.type === 'maxLength') {
            validationChain = validationChain.max(validation.value, validation.message);
          } else if (validation.type === 'email') {
            validationChain = validationChain.email(validation.message);
          } else if (validation.type === 'required') {
            validationChain = validationChain.required(validation.message);
          } else if (validation.type === 'min') {
            validationChain = validationChain.min(validation.value, validation.message).typeError(validation.message);
          } else if (validation.type === 'max') {
            validationChain = validationChain.max(validation.value, validation.message).typeError(validation.message);
          } else if (validation.type === 'matches') {
            validationChain = validationChain.matches(validation.value, validation.message);
          } else if (validation.type === 'url') {
            validationChain = validationChain.url(validation.message);
          } else if (validation.type === 'date') {
            validationChain = validationChain.date(validation.message);
          }
         
        });
      }

      schemaFields[field.name] = validationChain;
    });

    return yup.object().shape(schemaFields);
  };

  const { register, handleSubmit, formState: { errors } }: any = useForm({
    resolver: yupResolver(validationSchema as any),
  });

  if (!loginData) {
    return <Loader show={!loginData ? true : false} />
  }

  const onSubmit = (data: any) => {
    // Handle form submission here
  };

  const renderInput = (field: any) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
        return (
          <input
            type={field.type}
            {...register(field.name)}
            className={`${field.inputCssClass} ${errors[field.name] ? field.errorCssClass : "border-gray-100"}`}
            placeholder={field.placeholder}
          />
        );
      case 'checkbox':
        return (
          <input
            type={field.type}
            {...register(field.name)}
            className={field.inputCssClass}
          />
        );
      case 'dropdown':
        return (
          <select
            {...register(field.name)}
            className={`${field.inputCssClass} ${errors[field.name] ? field.errorCssClass : "border-gray-100"}`}
          >
            {field.options.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'file':
        return (
          <input
            type={field.type}
            {...register(field.name)}
            className={field.inputCssClass}
            accept={field.accept}
          />
        );
      default:
        return null;
    }
  };

  return (
    <section className="flex w-full h-screen bg-gray-50">
      <div className="bg-white px-6 py-6 rounded-3xl border-2 border-gray-200">
        <img className="w-16 mb-3" src="./img/fav-icon.png" alt="" />
        <h1 className="text-2xl font-semibold text-[#102030]">
          Welcome Back
        </h1>
        <p className="font-meduim text-md text-gray-500 mt-4">
          Welcome Back! Please enter your Details.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          {loginData[0].sections[1].components[0].fields.map((field: any) => (
            <div key={field.name} className="mt-4">
              <label className={field.labelCssClass}>{field.label}</label>
              {renderInput(field)}
              <p className={field.errorMessageCssClass}>{errors[field.name]?.message}</p>
            </div>
          ))}
          {loginData[0]?.sections[1]?.components[0]?.links?.map((link: any) => (
            <Link key={link.label} href={link.url} passHref>
              <button className={link.cssClass} type="button">
                {link.label}
              </button>
            </Link>
          ))}
          <div className="mt-8 flex flex-col gap-y-4">
            {loginData[0]?.sections[1]?.components[0]?.buttons.map((button: any) => (
              <Button key={button.label} type={button.type} disabled={button.disabled}>
                {button.label}
              </Button>
            ))}
          </div>
        </form>
      </div>
      <div
        className={`hidden relative lg:flex items-center justify-center h-full w-1/2 bg-gray-200`}
      >
        <img className="w-40 h-40 rounded-full animate-bounce" src="./img/fav-icon.png" alt="" />
        {/* <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-spin"></div> */}
        <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg"></div>
      </div>
    </section>
  );
};

export default Login;
"use client";
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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

  const createValidationSchema = (fields:any) => {
    const schemaFields:any = {};

    fields.forEach((field:any) => {
      let validationChain = yup.string();

      if (field.required) {
        validationChain = validationChain.required('This field is required.');
      }

      if (field.validations) {
        field.validations.forEach((validation:any) => {
          if (validation.type === 'minLength') {
            validationChain = validationChain.min(validation.value, validation.message);
          } else if (validation.type === 'maxLength') {
            validationChain = validationChain.max(validation.value, validation.message);
          }
          // Add more validation types as needed
        });
      }

      schemaFields[field.name] = validationChain;
    });

    return yup.object().shape(schemaFields);
  };

  const { register, handleSubmit, formState: { errors } }:any = useForm({
    resolver: yupResolver(validationSchema as any),
  });

  if (!loginData) {
    return <div>Loading...</div>;
  }

  const onSubmit = (data:any) => {
    // Handle form submission here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {loginData[0].sections[1].components[0].fields.map((field:any) => (
        <div key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            {...register(field.name)}
          />
          {errors[field.name] && <div>{errors[field.name].message}</div>}
        </div>
      ))}

      {loginData[0].sections[1].components[0].buttons.map((button:any) => (
        <button key={button.label} type={button.type} className={button.cssClass}>
          {button.label}
        </button>
      ))}
    </form>
  );
};

export default Login;
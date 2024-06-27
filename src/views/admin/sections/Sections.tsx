"use client";
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { Button } from '@/components/button/Button';
import { Breadcrumb, Card, Loader, Section } from '@/components';

const Sections = () => {
    const [loginData, setLoginData] = useState<any>(null);
    const [validationSchema, setValidationSchema] = useState(null);
    const [dynamicOptions, setDynamicOptions] = useState<any>({});
    const breadcrumbData = {
        title: "Demo",
        hasButton: false,
        childrens: [
            {
                labelName: "Dashboard",
                is_link: true,
                link: "/admin/dashboard",
            },
            {
                labelName: "Demo",
                is_link: true,
                link: "/demo/multi_section",
            },
            {
                labelName: "Multi-sections",
                is_link: false,

            },
        ],
    };
    useEffect(() => {
        fetch('http://localhost:5000/multi_sections')
            .then((response) => response.json())
            .then((data) => {
                setLoginData(data);
                setValidationSchema(createValidationSchema(data[0].sections) as any);
                fetch('http://localhost:5000/countries').then((responseData) => responseData.json()).then((dataCountry) => {
                    setDynamicOptions((prevOptions:any) => ({ ...prevOptions, ['country']: dataCountry }));
                }).catch((error) => console.error(error));
            })
            .catch((error) => console.error(error));
    }, []);

    const createValidationSchema = (sections: any) => {
        const schemaFields: any = {};

        sections.forEach((section: any) => {
            section.fields.forEach((field: any) => {
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
                        } else if (validation.type === 'min') {
                            validationChain = validationChain.min(validation.value, validation.message);
                        } else if (validation.type === 'max') {
                            validationChain = validationChain.max(validation.value, validation.message);
                        }
                        // Add more validation types as needed
                    });
                }

                schemaFields[field.name] = validationChain;
            });
        });

        return yup.object().shape(schemaFields);
    };

    const { register, handleSubmit, formState: { errors } }: any = useForm({
        resolver: yupResolver(validationSchema as any),
    });

    if (!loginData) {
        return <Loader show={!loginData ? true : false} />
        // return <div>Loading...</div>;
    }

    const onSubmit = (data: any) => {
        // Handle form submission here
    };

    const fetchDependentOptions = async (dependentField: any, value: any) => {
        const response = await fetch(`http://localhost:5000/${value}`);
        const data = await response.json();
        return data;
    };

    const renderInput = (field: any) => {
        switch (field.type) {
            case 'text':
            case 'date':
            case 'email':
            case 'password':
            case 'number':
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
                        onChange={async (event) => {
                            if (field.dependent) {
                                const options = await fetchDependentOptions(field.dependent.field, event.target.value);
                                setDynamicOptions((prevOptions:any) => ({ ...prevOptions, [field.dependent.field]: options }));
                            }
                        }}
                    >
                        {dynamicOptions[field.name]?.map((option: any) => (
                            <option key={option.id} value={option.name}>
                                {option.name}
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
            case 'textarea':
                return (
                    <textarea
                        // type={field.type}
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
        <>
            <Breadcrumb breadcrumbData={breadcrumbData} />
            <Card>
                <form className="grid grid-cols-1 p-3" onSubmit={handleSubmit(onSubmit)}>
                    {loginData[0].sections.map((section: any) => (
                        <Section key={section.section_name}>
                            <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                                <div className="flex-none md:flex">
                                    <h2 className="text-sm font-bold text-[#102030] dark:text-white flex-1 self-center mb-2 md:mb-0">{section.section_name}</h2>
                                </div>
                            </div>

                            {section.fields.map((field: any) => (
                                <div key={field.name}>
                                    <label htmlFor={field.name}>{field.label}</label>
                                    {renderInput(field)}
                                    {errors[field.name] && <p className={field.errorMessageCssClass}>{errors[field.name].message}</p>}
                                </div>
                            ))}
                        </Section>
                    ))}
                    <div className="m-1 flex gap-4">
                        {loginData[0]?.buttons.map((button: any) => (
                            <Button key={button.label} type={button.type} variant={button.variant} disabled={button.disabled}>
                                {button.label}
                            </Button>
                        ))}
                    </div>
                </form>
            </Card>
        </>
    );
};

export default Sections;
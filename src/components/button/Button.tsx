"use client";
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { FC, ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "../../utils/tailwind";

const buttonVariants = cva(
  ``,
  {
    variants: {
      variant: {
        noStyle : "",
        default: `font-medium active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all rounded-md text-white text-sm bg-rose-600`,
        submit: `rounded-md text-white text-sm bg-green-600 py-2 px-4  w-20`,
      },
      size: {
        standerd: "py-3 px-5",
        small: "py-1 px-2",
        medium: "py-2 px-3",
      },
    },
    defaultVariants: {
      size: "standerd",
      variant: "default",
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size, variant, ...props }, ref) => {
    return (
      <button
        {...props}
        className={cn(buttonVariants({ size, variant, className }))}
        ref={ref}
      >
        {props.children}
      </button>
    );
  }
);

// className={`py-3 px-5 rounded-md text-white text-sm font-medium active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all  ${styles.primary_bg_btn}`} onClick={action}
export { Button, buttonVariants };

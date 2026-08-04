"use client";

import { forwardRef, useId } from "react";
import { cn } from "@/lib/cn";

const fieldBase =
  "focus-accent w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-[15px] text-white placeholder:text-white/30 transition-colors duration-200 hover:border-white/20";

function Label({ children, htmlFor, required }: { children: React.ReactNode; htmlFor: string; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-secondary">
      {children}
      {required && <span className="ml-1 text-accent">*</span>}
    </label>
  );
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  required?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, required, className, id, ...props }, ref) => {
    const gen = useId();
    const fieldId = id ?? gen;
    return (
      <div>
        {label && <Label htmlFor={fieldId} required={required}>{label}</Label>}
        <input ref={ref} id={fieldId} className={cn(fieldBase, "h-12", className)} {...props} />
      </div>
    );
  },
);
Input.displayName = "Input";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  required?: boolean;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, required, className, id, ...props }, ref) => {
    const gen = useId();
    const fieldId = id ?? gen;
    return (
      <div>
        {label && <Label htmlFor={fieldId} required={required}>{label}</Label>}
        <textarea ref={ref} id={fieldId} className={cn(fieldBase, "resize-none py-3 leading-relaxed", className)} {...props} />
      </div>
    );
  },
);
Textarea.displayName = "Textarea";

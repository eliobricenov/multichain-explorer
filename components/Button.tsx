import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

export default function Button({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={clsx(
        className,
        "h-10 py-2 px-4 inline-flex items-center justify-center rounded-md text-sm font-medium"
      )}
      {...props}
    />
  );
}

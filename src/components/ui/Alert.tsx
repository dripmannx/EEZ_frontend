import { ComponentProps, forwardRef } from "react";
import { AiFillWarning } from "react-icons/ai";
interface Props extends ComponentProps<"span"> {
  open: boolean;
  text: string;
}
export const Alert = forwardRef<HTMLInputElement, Props>(function Alert(
  { open, text, ...props },
  ref
) {
  if (open)
    return (
      <span
        {...props}
        ref={ref}
        className="flex items-center gap-3 rounded bg-red-500 p-5 text-lg text-light-text"
      >
        <AiFillWarning />
        {open ? text : null}
      </span>
    );
  return null;
});

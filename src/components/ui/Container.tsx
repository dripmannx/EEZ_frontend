import { ReactNode } from "react";

interface Props {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  fontTitle?: string;
  styles?: string;
}

export function Container({
  title,
  action,
  children,
  fontTitle = "3xl",
  styles,
  ...props
}: Props) {
  return (
    <>
      <div
        {...props}
        className={`w-full border   border-gray-700 bg-secondary p-6 shadow-lg dark:bg-dark-secondary sm:my-8 sm:rounded-xl ${styles}`}
      >
        {(title || action) && (
          <div className="mb-4 flex items-center justify-between">
            {title && (
              <h1
                className={`text-${fontTitle} overflow-hidden overflow-ellipsis whitespace-nowrap font-bold text-base-light dark:text-base-dark`}
              >
                {title}
              </h1>
            )}
            {action}
          </div>
        )}
        {children}
      </div>
    </>
  );
}

import { ReactNode } from "react";

interface Props {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
}

export function Container({ title, action, children }: Props) {
  return (
    <>
      <div className="w-full border   border-gray-700 bg-secondary p-6 shadow-lg dark:bg-dark-secondary sm:my-8 sm:rounded-xl">
        {(title || action) && (
          <div className="mb-4 flex items-center justify-between">
            {title && (
              <h1 className="text-3xl font-bold text-base-light dark:text-base-dark">
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

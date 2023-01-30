import { ReactNode } from 'react';

interface Props {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
}

export function Container({ title, action, children }: Props) {
  return (
    <>
      <div className="sm:my-8 w-full sm:max-w-lg  sm:rounded-xl shadow-lg bg-secondary dark:bg-dark-secondary p-6">
        {(title || action) && (
          <div className="flex items-center justify-between mb-4">
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

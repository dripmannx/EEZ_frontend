import { Button } from './Button';
const NotFound = () => {
  return (
    <div className="w-full flex justify-center text-applied dark:text-dark-text-base">
      <div className="w-1/2 flex text-center gap-4 mt-10 flex-col ">
        <h1 className="text-4xl dark:text-dark-text-hover">
          404 Seite nicht gefunden
        </h1>
        <p className="text-xl">
          Die aufgerufene Seite exestiert nicht
        </p>
        <Button href="/">Zurück zur Übersicht</Button>
      </div>
    </div>
  );
};

export default NotFound;

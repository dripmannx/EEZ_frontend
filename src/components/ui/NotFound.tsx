import { Button } from './Button';
interface Props {
  text: string;
}
const NotFound = ({ text }: Props) => {
  return (
    <div className="w-full flex justify-center  ">
      <div className="w-1/2 flex text-center gap-4 mt-10 flex-col ">
        <h1 className="text-4xl dark:text-dark-text-hover">
          404 Seite nicht gefunden
        </h1>
        <p className="text-xl dark:text-dark-text-base">{text}</p>
        <Button href="/">Zurück zur Übersicht</Button>
      </div>
    </div>
  );
};

export default NotFound;

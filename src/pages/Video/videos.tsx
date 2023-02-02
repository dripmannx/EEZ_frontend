import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";
import { allVideosQuery } from "../../services/Routing";
import { Video } from "../../services/types";

const Videos = () => {
  const { data: Videos } = useQuery(allVideosQuery());
  const Videoss = useLoaderData();

  console.log(Videos);
  if (Videos)
    return (
      <div>
        {JSON.stringify(Videos)}
        <Testvideo Video={Videos} />
        <progress className="relative  h-2 overflow-hidden rounded-full"></progress>
      </div>
    );
  return <progress>Loading</progress>;
};
interface test {
  Video: Video[];
}
export const Testvideo = ({ Video }: test) => {
  return <div>{JSON.stringify(Video)}</div>;
};
export default Videos;

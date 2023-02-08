import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { allVideosQuery } from "../../services/Routing";
import { Video } from "../../services/types";
interface propss {
  Videos: Video[];
}
const Videos = () => {
  const query = "Historie Deutsch";
  const { data: Videos } = useQuery(allVideosQuery());

  if (Videos)
    return (
      <div className="text-dark-text-hover">
        <Testvideo Videos={Videos} />
      </div>
    );
  return (
    <progress className="relative  h-2 overflow-hidden rounded-full"></progress>
  );
};
interface test {
  Videos: Video[];
}
export const Testvideo = ({ Videos }: test) => {
  const [query, setQuery] = useState("");
  const filteredItems = useMemo(
    () =>
      Videos.filter((item) => {
        if (query === "") {
          return item;
        } else if (item.title_de.toLowerCase().includes(query.toLowerCase())) {
          return item;
        }
      }),
    [query, Videos]
  );

  return (
    <>
      <input
        placeholder="Suche"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {filteredItems.map((video) => (
        <div key={video.id}>{video.title_de}</div>
      ))}
    </>
  );
};
export default Videos;

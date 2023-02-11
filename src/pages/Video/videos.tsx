import { Menu } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { Container } from "@ui/Container";
import { Loader } from "@ui/Loader";
import { Searchbar } from "@ui/Searchbar";
import { useMemo, useState } from "react";
import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import { allVideosQuery } from "../../services/Querys";
import { Video } from "../../services/types";
interface propss {
  Videos: Video[];
}
const Videos = () => {
  const { data: Videos } = useQuery(allVideosQuery());
  const [query, setQuery] = useState("");
  if (Videos)
    return (
      <>
        {" "}
        <Container
          title="Videos"
          action={
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center gap-2  rounded-md border border-gray-700 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 dark:bg-dark-primary  dark:text-dark-text-hover dark:hover:bg-zinc-800">
                  <Link
                    className="flex flex-row items-center gap-2"
                    to={`/new`}
                  >
                    Hinzufügen
                    <BiPlus size={"1.5em"} aria-hidden="true" />
                  </Link>
                </Menu.Button>
              </div>
            </Menu>
          }
        >
          <Searchbar
            placeholder="In Videos suchen"
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(e.target.value)
            }
          />
        </Container>
        <VideoHelper Videos={Videos} query={query} />
      </>
    );
  return <Loader text="Videos werden geladen..." />;
};
interface Props {
  Videos: Video[];
  query: string;
}
export const VideoHelper = ({ Videos, query }: Props) => {
  const filteredItems = useMemo(
    () =>
      Videos.filter((item) => {
        if (query === "") {
          return item;
        } else if (
          item.title_de.toLowerCase().includes(query.toLowerCase()) ||
          item.title_en.toLocaleLowerCase().includes(query.toLocaleLowerCase())
        ) {
          return item;
        }
      }),
    [query, Videos]
  );

  return (
    <>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((video) => (
          <Container
            key={video.id}
            fontTitle="xl"
            styles="dark:hover:bg-zinc-800 cursor-pointer"
            title={video.title_de}
            action={
              <div className="flex gap-4 text-dark-text-base ">
                <BiTrash
                  size="1.5em"
                  className="cursor-pointer dark:hover:text-dark-text-hover"
                />
                <BiEdit
                  size="1.5em"
                  className="cursor-pointer dark:hover:text-dark-text-hover "
                />
              </div>
            }
          >
            <img src={`http://localhost:8000${video.screenshot}`}></img>
          </Container>
        ))}
      </div>
    </>
  );
};
export default Videos;

import { Menu } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import CheckboxList from "@ui/CheckboxList";
import { Container } from "@ui/Container";
import { Form, useZodForm } from "@ui/Form";
import { CheckBox, Input } from "@ui/Input";
import { Loader } from "@ui/Loader";
import { Searchbar } from "@ui/Searchbar";
import { SubmitButton } from "@ui/SubmitButton";
import { Table } from "@ui/Table";
import React, { useState } from "react";
import { BiArrowBack, BiPlus } from "react-icons/bi";

import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { boolean, object, string, z } from "zod";
import {
  allClientsQuery,
  allVideosQuery,
  clientQuery,
  useAddClient,
  useUpdateClient,
} from "../../services/Querys";
import { Client, Video } from "../../services/types";

export const Clients = () => {
  const { data: Clients } = useQuery(allClientsQuery());
  const [query, setQuery] = useState<string>("");

  if (Clients)
    return (
      <>
        <Container
          title="Clients"
          action={
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center gap-2  rounded-md border border-gray-700 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 dark:bg-dark-primary  dark:text-dark-text-hover dark:hover:bg-zinc-800">
                  <Link className="flex flex-row items-center gap-2" to={`new`}>
                    Hinzufügen
                    <BiPlus size={"1.5em"} aria-hidden="true" />
                  </Link>
                </Menu.Button>
              </div>
            </Menu>
          }
        >
          <Searchbar
            placeholder="In Clients suchen"
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(e.target.value)
            }
          />
        </Container>

        <Table Clients={Clients} query={query as string} />
        <Outlet />
      </>
    );
  return <Loader text="Clients werden geladen..." />;
};

export default Clients;

export const newVideoSchema = z.object({
  id: z.number(),
  video: string(),
  screenshot: string(),
  published: string(),
  title_de: string().max(200),
  title_en: string().max(200),
  text_de: string().max(1000),
  text_en: string().max(1000),
});
const newClientSchema = object({
  ip_address: string()
    .min(1, { message: "IP Adresse muss angegeben sein" })
    .regex(
      new RegExp(
        "^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
      ),
      { message: "IP Adresse nicht im richtigem Format" }
    ),
  pc_name: string().min(1, { message: "Name muss angegeben sein" }),
  is_expo_client: boolean(),
});

export function NewClient() {
  let { id } = useParams<string>();
  const navigate = useNavigate();
  const form = useZodForm({
    schema: newClientSchema,
  });
  const [inputError, setInputError] = useState({
    open: false,
    message: "",
  });

  const { data: Videos } = useQuery(allVideosQuery());
  const { data: Client } = useQuery(clientQuery({ id }));
  if (Videos !== undefined)
    return (
      <Container
        title={Client ? "Client bearbeiten" : "Neuer Client"}
        action={
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center gap-2  rounded-md border border-gray-700 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 dark:bg-dark-primary  dark:text-dark-text-hover dark:hover:bg-zinc-600">
                <div
                  className="flex flex-row items-center gap-2"
                  onClick={() => navigate(-1)}
                >
                  <BiArrowBack size={"1.5em"} />
                  Zurück
                </div>
              </Menu.Button>
            </div>
          </Menu>
        }
      >
        <NewEditClient Client={Client as Client} Videos={Videos} />
      </Container>
    );
  return <Loader text="Videos werden geladen..." />;
}

interface Props {
  Client: Client | undefined;

  Videos: Video[];
}
export function NewEditClient({ Videos, Client }: Props) {
  const navigate = useNavigate();
  const [inputError, setInputError] = useState({
    open: false,
    message: "",
  });
  const [clientVideos, setClientVideos] = useState<Video[]>(Videos);
  const form = useZodForm({
    schema: newClientSchema,
  });
  const handleSuccess = () => {
    /* Toast({
      text: "Client erfolgreich hinzugefügt",
      variant: "success",
      Icon: <BiCheckCircle />,
      TTL: 30,
    }); */

    navigate("/clients");
  };
  const handleError = () => {
    console.log("Error");
  };
  const postClient = useAddClient({
    config: {
      onSuccess: handleSuccess,
      onError: handleError,
    },
  });
  const updateClient = useUpdateClient({
    config: {
      onSuccess: handleSuccess,
      onError: handleError,
    },
  });

  const onSubmit = (data: {
    pc_name: string;
    ip_address: string;
    is_expo_client: boolean;
  }) => {
    console.log("submit");
    let formData = { ...data } as Client;

    formData["Videos"] = clientVideos;
    if (!Client) {
      postClient.mutate(formData);
    } else {
      updateClient.mutate({
        newClient: formData,
        id: Client.id,
      });
    }
  };
  React.useEffect(() => {
    //@ts-nocheck
    if (updateClient.error?.code == "ERR_BAD_REQUEST")
      setInputError({
        open: true,
        message: "Falsche Eingabe oder Name und IP-Adresse exestieren bereits",
      });
    if (Client !== undefined) {
      form.setValue("pc_name", Client.pc_name);
      form.setValue("ip_address", Client.ip_address);
      form.setValue("is_expo_client", Client.is_expo_client);
    }
    if (Client) {
      setClientVideos(Client.Videos);
    } else {
      setClientVideos(Videos);
    }
  }, [postClient.isError, Client]);
  return (
    <Form form={form} onSubmit={(data) => onSubmit(data)}>
      <Input label="Name" {...form.register("pc_name")} />
      <Input label="IP Adresse" {...form.register("ip_address")} />
      <CheckBox
        type="checkbox"
        label="Ausstellungs Client"
        {...form.register("is_expo_client")}
      />
      <CheckboxList
        clientVideos={clientVideos}
        setClientVideos={setClientVideos}
        allVideos={Videos}
      />{" "}
      <div className={`${Client ? "justify-left flex gap-7" : "w-full"}  `}>
        <SubmitButton>
          {Client ? "Änderungen Speichern" : "Client Erstellen"}
        </SubmitButton>
      </div>
    </Form>
  );
}

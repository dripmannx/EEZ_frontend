type Props = {};

export const Clients = (props: Props) => {
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
  return (
    <progress className="relative  h-2 overflow-hidden rounded-full"></progress>
  );
};

export default Clients;
import { Menu } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { Container } from "@ui/Container";
import { Form, useZodForm } from "@ui/Form";
import { Input } from "@ui/Input";
import { Searchbar } from "@ui/Searchbar";
import { SubmitButton } from "@ui/SubmitButton";
import { Table } from "@ui/Table";
import { useState } from "react";
import { BiArrowBack, BiPlus } from "react-icons/bi";

import { Link, Outlet, useNavigate } from "react-router-dom";
import { object, string, z } from "zod";
import { allClientsQuery } from "../../services/Routing";

export const newVideoSchema = z.object({
  id: z.number(),
  video: string(),
  screenshot: string(),
  published: string(),
  title_de: string().max(200),
  title_en: string().max(200),
  text_de: string().max(2000),
  text_en: string().max(2000),
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
  name: string().min(1, { message: "Name muss angegeben sein" }),
});

export function NewClient() {
  const navigate = useNavigate();
  const form = useZodForm({
    schema: newClientSchema,
  });

  return (
    <Container
      title="Neuer Client"
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
      <Form
        form={form}
        onSubmit={({ name, ip_address }) =>
          alert(JSON.stringify(form.getValues()))
        }
      >
        <Input label="Name" {...form.register("name")} />
        <Input label="IP Adresse" {...form.register("ip_address")} />

        <SubmitButton>Client Erstellen</SubmitButton>
      </Form>
    </Container>
  );
}

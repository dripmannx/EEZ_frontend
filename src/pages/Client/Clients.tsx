type Props = {};

export const Clients = (props: Props) => {
  const { data: Clients } = useQuery(allClientsQuery());
  const query = useOutletContext();
  if (Clients)
    return (
      <div className=" flex justify-center">
        <Table Clients={Clients} query={query as string} />
        <Outlet />
      </div>
    );
  return (
    <progress className="relative  h-2 overflow-hidden rounded-full"></progress>
  );
};

export default Clients;

import { useQuery } from "@tanstack/react-query";
import { Container } from "@ui/Container";
import { Form, useZodForm } from "@ui/Form";
import { Input } from "@ui/Input";
import { SubmitButton } from "@ui/SubmitButton";
import { Table } from "@ui/Table";

import { Outlet, useOutletContext } from "react-router-dom";
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
  const form = useZodForm({
    schema: newClientSchema,
  });

  return (
    <Container title="Neuer Client">
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

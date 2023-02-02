type Props = {};
import { Table } from "@ui/table";
export const Clients = (props: Props) => {
  const Clients = useLoaderData();
  return (
    <div className=" flex justify-center">
      <Table />
      <Outlet />
    </div>
  );
};

export default Clients;

import { Container } from "@ui/Container";
import { Form, useZodForm } from "@ui/Form";
import { Input } from "@ui/Input";
import { SubmitButton } from "@ui/SubmitButton";
import { Outlet, useLoaderData } from "react-router-dom";
import { object, string, z } from "zod";

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

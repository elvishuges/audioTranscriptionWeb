import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useCreateSumarry } from "@/http/use-create-sumarry";

// Esquema de validação no mesmo arquivo conforme solicitado
const createSumarrySchema = z.object({
  content: z
    .string()
    .min(1, "Resumo é obrigatória")
    .min(10, "Resumo deve ter pelo menos 10 caracteres")
    .max(500, "Resumo deve ter menos de 500 caracteres"),
});

type CreateSumarryFormData = z.infer<typeof createSumarrySchema>;

interface SumarryFormProps {
  roomId: string;
}

export function CreateSumarryForm({ roomId }: SumarryFormProps) {
  const { mutateAsync: createSumarry } = useCreateSumarry(roomId);

  const form = useForm<CreateSumarryFormData>({
    resolver: zodResolver(createSumarrySchema),
    defaultValues: {
      content: "",
    },
  });

  async function handleCreateSummary(data: CreateSumarryFormData) {
    await createSumarry(data);
    form.reset();
  }

  const { isSubmitting } = form.formState;

  return (
    <Card className="mt-5">
      <CardHeader>
        <CardTitle>Fazer uma Resumo</CardTitle>
        <CardDescription>
          Digite seu Resumo abaixo para servir de resposta gerada por I.A.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(handleCreateSummary)}
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seu Resumo</FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-[100px]"
                      disabled={isSubmitting}
                      placeholder="O que você gostaria de saber?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isSubmitting} type="submit">
              Enviar Resumo
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

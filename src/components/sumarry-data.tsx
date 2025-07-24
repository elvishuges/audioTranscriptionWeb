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
import { useRoomSumarry } from "@/http/use-room-sumarry";

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

export function SummaryData({ roomId }: SumarryFormProps) {
  const { mutateAsync: createSumarry } = useCreateSumarry(roomId);
  const { data, isLoading } = useRoomSumarry(roomId);

  async function handleCreateSummary(data: CreateSumarryFormData) {
    await createSumarry(data);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumo Criado</CardTitle>
        <CardDescription>{data?.content}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}

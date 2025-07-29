import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useRoomSumarry } from "@/http/use-room-sumarry";

// Esquema de validação no mesmo arquivo conforme solicitado
const createSumarrySchema = z.object({
  content: z
    .string()
    .min(1, "Resumo é obrigatória")
    .min(10, "Resumo deve ter pelo menos 10 caracteres")
    .max(500, "Resumo deve ter menos de 500 caracteres"),
});

interface SumarryFormProps {
  roomId: string;
}

export function SummaryData({ roomId }: SumarryFormProps) {
  const { data } = useRoomSumarry(roomId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumo Criado</CardTitle>
        <CardDescription>
          {data?.content || "Nenhum resumo Criado..."}
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}

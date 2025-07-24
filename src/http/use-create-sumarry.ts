import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateSumarryRequest } from "./types/create-sumarry-request";
import type { CreateSumarryResponse } from "./types/create-sumarry-response";
import type { GetRoomSumarryResponse } from "./types/get-room-sumarry-response";

export function useCreateSumarry(roomId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateSumarryRequest) => {
      const response = await fetch(
        `http://localhost:3333/rooms/${roomId}/sumarry`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result: CreateSumarryResponse = await response.json();

      return result;
    },
    // Executa no momento que for feita a chamada p/ API
    onMutate({ content }) {
      const previousSumarry = queryClient.getQueryData<GetRoomSumarryResponse>([
        "get-sumarry",
        roomId,
      ]);

      const newSummary = {
        id: crypto.randomUUID(),
        content: content,
        createdAt: new Date().toISOString(),
        isGenetaringSumarry: true,
      };
      if (!previousSumarry) {
        queryClient.setQueryData<GetRoomSumarryResponse>(
          ["get-sumarry", roomId],
          newSummary
        );
      }

      return { newSummary, previousSumarry };
    },
    onSuccess(data, _variables, context) {
      queryClient.setQueryData<GetRoomSumarryResponse>(
        ["get-sumarry", roomId],
        (sumarry) => {
          if (sumarry) {
            return {
              id: sumarry.id,
              content: sumarry.content,
              createdAt: sumarry.createdAt,
            };
          }
        }
      );
    },
  });
}

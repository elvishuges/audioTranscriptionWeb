import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateSumarryRequest } from "./types/create-sumarry-request";
import type { CreateSumarryResponse } from "./types/create-sumarry-response";
import type { GetRoomSumarryResponse } from "./types/get-room-sumarry-response";

export function useCreateSumarry(roomId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateSumarryRequest) => {
      const response = await fetch(
        `http://localhost:3333/rooms/${roomId}/sumarrys`,
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
  });
}

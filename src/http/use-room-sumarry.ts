import { useQuery } from "@tanstack/react-query";
import type { GetRoomSumarryResponse } from "./types/get-room-sumarry-response";

export function useRoomSumarry(roomId: string) {
  return useQuery({
    queryKey: ["get-sumarry", roomId],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3333/rooms/${roomId}/sumarry`
      );
      const result: GetRoomSumarryResponse = await response.json();

      return result;
    },
  });
}

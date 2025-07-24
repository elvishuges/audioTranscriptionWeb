/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
import { Navigate, useParams } from "react-router-dom";
import { CreateSumarryForm } from "@/components/sumarry-form";
import { SummaryData } from "@/components/sumarry-data";

type RoomParams = {
  roomId: string;
};

export function CreateRoomSummary() {
  const params = useParams<RoomParams>();
  if (!params.roomId) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <SummaryData roomId={params.roomId} />
      <CreateSumarryForm roomId={params.roomId} />
    </div>
  );
}

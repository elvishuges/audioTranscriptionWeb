/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
import { Navigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CreateSumarryForm } from "@/components/create-sumarry-form";

type RoomParams = {
  roomId: string;
};

export function CreateRoomSummary() {
  const params = useParams<RoomParams>();

  async function submitSummary(audio: Blob) {
    const formData = new FormData();

    formData.append("file", audio, "audio.webm");

    const response = await fetch(
      `http://localhost:3333/rooms/${params.roomId}/audio`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    console.log(result);
  }

  if (!params.roomId) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <CreateSumarryForm roomId={params.roomId} />
    </div>
  );
}

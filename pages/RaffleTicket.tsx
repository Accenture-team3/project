import type { Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

export default function RaffleTicket() {
  const createTicket = async () => {
    await client.models.Ticket.create({
      isRedeemed: false,
    });
  };

  return (
    <div>
      <button onClick={createTicket}>Generate a ticket</button>
    </div>
  );
}

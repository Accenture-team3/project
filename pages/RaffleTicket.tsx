import type { Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from "react";

const client = generateClient<Schema>();

export default function RaffleTicket() {
  const [tickets, setTickets] = useState<Schema["Ticket"]["type"][]>([]);

  const fetchTickets = async () => {
    const { data: items, errors } = await client.models.Ticket.list();
    setTickets(items);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const createTicket = async () => {
    await client.models.Ticket.create({});

    fetchTickets();
  };

  return (
    <div>
      <button onClick={createTicket}>Generate a ticket</button>
      <ul>
        {tickets.map(({ id, isRedeemed, owner }) => (
          <li key={id}>
            {isRedeemed}, {owner}
          </li>
        ))}
      </ul>
    </div>
  );
}

import type { Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from "react";

const client = generateClient<Schema>();

export default function RaffleTicket() {
  const [tickets, setTickets] = useState<Schema["Ticket"]["type"][]>([]);

  useEffect(() => {
    const sub = client.models.Ticket.observeQuery().subscribe({
      next: ({ items }) => {
        setTickets([...items]);
      },
    });

    return () => sub.unsubscribe();
  }, []);

  const createTicket = async () => {
    await client.models.Ticket.create({});
  };

  const redeemTicket = async (id: string) => {
    const updatedData = {
      id: id,
      isRedeemed: true,
    };

    const { data: updatedTicket, errors } = await client.models.Ticket.update(
      updatedData
    );
  };

  return (
    <div>
      <button onClick={createTicket}>Generate a ticket</button>
      <ul>
        {tickets.map(({ id, isRedeemed, owner }) => (
          <li key={id}>
            {!isRedeemed && (
              <button onClick={() => redeemTicket(id)}>
                Redeem your ticket
              </button>
            )}
            Your ticket is currently {isRedeemed ? "Redeemed" : "Not redeemed"}
          </li>
        ))}
      </ul>
    </div>
  );
}

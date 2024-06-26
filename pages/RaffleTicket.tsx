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

  const redeemTicket = async (id: string, userId: string) => {
    const updatedData = {
      id: id,
      isRedeemed: true,
      ownerId: userId,
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
          <div>
            <li key={id}>
              Your ticket is currently{" "}
              {isRedeemed ? "Redeemed" : "Not redeemed"}
            </li>
            <button onClick={() => redeemTicket(id, owner!)}>Redeem your ticket</button>
          </div>
        ))}
      </ul>
    </div>
  );
}

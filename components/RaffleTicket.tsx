import type { Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from "react";
import Modal from "./Modal"; // Ensure the correct path

const client = generateClient<Schema>();

export default function RaffleTicket() {
  const [tickets, setTickets] = useState<Schema["Ticket"]["type"][]>([]);
  const [displayTickets, setDisplayTickets] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  const redeemFirstAvailableTicket = () => {
    const firstNonRedeemedTicket = tickets.find((ticket) => !ticket.isRedeemed);
    if (firstNonRedeemedTicket) {
      redeemTicket(firstNonRedeemedTicket.id);
    }
    setShowModal(true);
  };

  const redeemTicket = async (id: string) => {
    const updatedData = {
      id: id,
      isRedeemed: true,
    };

    const { data: updatedTicket, errors } = await client.models.Ticket.update(
      updatedData
    );
    if (!errors) {
      setTickets(
        tickets.map((ticket) =>
          ticket.id === id ? { ...ticket, isRedeemed: true } : ticket
        )
      );
    }
  };

  return (
    <div className="flex flex-col">
      <div className="bg-white inline-flex p-8 pt-16 pb-16 rounded-[32px] items-end shadow-lg">
        <svg
          className="w-16 h-auto md:w-24 lg:w-32"
          viewBox="0 0 507 459"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M339.49 0L9.27117 250.964C10.1656 251.863 11.0074 252.829 11.7908 253.86C23.2189 268.897 17.9208 292.196 0 306.172L111.83 453.319C130.094 439.797 153.96 440.932 165.387 455.968C165.904 456.649 166.388 457.347 166.837 458.06L496.835 207.263C496.268 206.639 495.724 205.987 495.207 205.305C483.778 190.268 489.077 166.968 506.999 152.991L395.167 5.84223C376.902 19.3697 353.032 18.2368 341.603 3.19843C340.821 2.16912 340.117 1.1011 339.49 0ZM242.54 153.224L289.313 129.275L310.464 81.1715L347.695 118.255L399.98 123.506L376.217 170.374L387.38 221.722L335.462 213.605L290.076 240.089L281.753 188.205L242.54 153.224ZM170.72 399.455C179.381 388.13 177.222 371.928 165.897 363.267C154.572 354.606 138.369 356.765 129.708 368.09C121.047 379.415 123.207 395.617 134.532 404.279C145.857 412.94 162.059 410.78 170.72 399.455ZM186.131 284.864C197.456 293.525 199.615 309.727 190.954 321.052C182.293 332.377 166.091 334.537 154.766 325.876C143.441 317.214 141.281 301.012 149.942 289.687C158.603 278.362 174.806 276.203 186.131 284.864ZM236.257 261.811C244.918 250.486 242.758 234.284 231.433 225.623C220.108 216.962 203.906 219.122 195.245 230.447C186.584 241.772 188.743 257.974 200.069 266.635C211.394 275.296 227.596 273.137 236.257 261.811Z"
            fill="#4A37BE"
          />
        </svg>
        <div className="inline-flex items-end">
          <h1 className="text-6xl font-bold">x{tickets.length}</h1>
          <span className="text-2xl font-medium pl-3 pb-1">tickets</span>
        </div>
      </div>
      <div className="flex flex-col pt-16">
        <button
          className="bg-purple text-white rounded-full mb-6 py-3 font-semibold active:py-[11px]"
          onClick={redeemFirstAvailableTicket}
        >
          Scratch Ticket
        </button>
        <button
          className="bg-white border-purple text-purple rounded-full py-3 font-semibold border-2 hover:bg-purple hover:text-white active:py-[11px]"
          onClick={() => setDisplayTickets(!displayTickets)}
        >
          My Tickets
        </button>
      </div>
      {displayTickets && (
        <ul>
          {tickets.map(({ id, isRedeemed, owner }) => (
            <li key={id}>
              Your ticket is {isRedeemed ? "Redeemed" : "Not redeemed"}
              {!isRedeemed && (
                <button onClick={() => redeemTicket(id)}>
                  Redeem your ticket
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
      <Modal showModal={showModal} closeModal={() => setShowModal(false)} />
    </div>
  );
}

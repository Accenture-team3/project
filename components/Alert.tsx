import type { Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from "react";

const client = generateClient<Schema>();

export default function Alert() {
  const [alert, setAlert] = useState<Schema["Alert"]["type"][]>();

  useEffect(() => {
    const sub = client.models.Alert.observeQuery().subscribe({
      next: ({ items }) => {
        setAlert([...items]);
      },
    });

    return () => sub.unsubscribe();
  }, []);

  const createAlert = async (title: string, message: string) => {
    await client.models.Alert.create({
      title: title,
      message: message,
    });
  };

  return (
    <div>
      <button
        onClick={() =>
          createAlert("Very important notification", "It is important")
        }
      >
        Create an alert
      </button>
      <ul>
        {alert?.map(({ id, title, message }) => (
          <li key={id}>
            <h1>{title}</h1>
            <p>{message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

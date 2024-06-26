import { Authenticator } from "@aws-amplify/ui-react";
import Welcome from "@/components/Welcome";

export default function App() {
  return (
    <Authenticator>
      <div>
        <main>
          <Welcome />
        </main>
      </div>
    </Authenticator>
  );
}

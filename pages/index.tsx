import {
  Authenticator,
  ThemeProvider,
  Theme,
  useTheme,
  useAuthenticator,
} from "@aws-amplify/ui-react";
import Welcome from "@/components/Welcome";

export default function App() {
  return (
    <div>
      <main>
        <Welcome />
      </main>
    </div>
  );
}

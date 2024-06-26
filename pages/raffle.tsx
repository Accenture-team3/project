import { Authenticator, View } from "@aws-amplify/ui-react";
import NavBar from "@/components/navbar/NavBar";
import RaffleTicket from "@/components/RaffleTicket";

export default function App() {
  return (
    <View className="">
      <Authenticator>
        {({ signOut, user }) => (
          <div>
            <RaffleTicket />
            <NavBar></NavBar>
          </div>
        )}
      </Authenticator>
    </View>
  );
}

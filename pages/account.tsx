import React from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import Navbar from "@/components/navbar/NavBar";

const Account: React.FC = () => {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div>
          <div>account hello</div>
          <button onClick={signOut}>Sign Out</button>
          <Navbar />
        </div>
      )}
    </Authenticator>
  );
};

export default Account;
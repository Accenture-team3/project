import React from "react";
import { Authenticator, Link } from "@aws-amplify/ui-react";
import Navbar from "@/components/navbar/NavBar";

const Account: React.FC = () => {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div>
          <div>account hello</div>
          <Link href="/map">
            <button onClick={signOut}>Sign Out</button>
          </Link>
          <Navbar />
        </div>
      )}
    </Authenticator>
  );
};

export default Account;

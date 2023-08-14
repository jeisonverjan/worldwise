import { useAuth0 } from "@auth0/auth0-react";
import Button from "./Button";

function LoginButton({ content }) {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button type="primary" onClick={() => loginWithRedirect()}>
      {content}
    </Button>
  );
}

export default LoginButton;

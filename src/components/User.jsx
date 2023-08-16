import { useAuth0 } from "@auth0/auth0-react";
import styles from "./User.module.css";
import LogoutButton from "./LogoutButton";
import Spinner from "./Spinner";

function User() {
  const { user, isLoading } = useAuth0();

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.user}>
      <img src={user?.picture} alt={user?.name} />
      <span>Welcome, {user?.nickname}</span>
      <LogoutButton />
    </div>
  );
}

export default User;

/*
CHALLENGE

1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/

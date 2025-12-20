import { Redirect } from "expo-router";
import { useAuth } from "../hooks/useAuth";
import Loading from "../components/Loading";

export default function Index() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return user
    ? <Redirect href="/main/groups" />
    : <Redirect href="/auth/login" />;
}

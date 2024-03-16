import useCurrentUser from "@/hooks/useCurrentUser";
import Image from "next/image";

export default function Home() {
  const {data:currentUser} = useCurrentUser();
  console.log(currentUser);
  return (
    <div>

    </div>
  );
}

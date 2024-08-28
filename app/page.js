import Image from "next/image";
import Login from "./login/page";

export default function Home() {
  return (
    <div>
      <h1>ProductFlow</h1>
      <Image src="/productflow.png" width={50} height={50} alt="ProductFlow logo" />
      <Login />
    </div>
  );
}

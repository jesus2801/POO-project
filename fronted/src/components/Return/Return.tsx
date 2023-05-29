import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./Return.module.css";

const Return = () => {
  const router = useRouter();

  return (
    <Image
      onClick={() => {
        router.push("/");
      }}
      className={styles.return}
      width={51}
      height={56}
      src="/return.svg"
      alt="regresar"
    />
  );
};

export default Return;

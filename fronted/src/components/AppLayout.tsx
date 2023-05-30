import Login from "@/app/login/page";
import { updateToken } from "@/config/axios.config";
import { ReactNode, useEffect, useState } from "react";

const AppLayout = ({ children }: { children: ReactNode }) => {
  const [forbidden, setForbidden] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      console.log("ACTUALIZANDO TOKENK");
      updateToken();
      setForbidden(false);
    } else {
      setForbidden(true);
    }
  }, []);

  return forbidden ? <Login /> : <>{children}</>;
};

export default AppLayout;

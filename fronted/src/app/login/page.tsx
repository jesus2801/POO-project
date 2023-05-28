"use client";

import { NextPage } from "next";
import Image from "next/image";
import styles from "./page.module.css";
import "./default.styles.css";
import { ChangeEvent, useState } from "react";
import { client } from "../../config/axios.config";
import { loading, showMessage } from "../../utils/alerts";
import { translateError } from "../../config/messages";
import { useRouter } from "next/navigation";
import { updateToken } from "../../config/axios.config";

const Login: NextPage = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    password: "",
  });

  const [register, setRegister] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const onChangeChecked = (e: ChangeEvent<HTMLInputElement>) => {
    setRegister(e.currentTarget.checked);
  };

  const onSubmit = async () => {
    try {
      loading(true);
      const response = await client.post(
        register ? "/auth/register" : "/auth/login",
        form
      );
      loading(false);
      localStorage.setItem("token", response.data.token);
      updateToken();
      router.push("/");
    } catch (e: any) {
      loading(false);
      //@ts-ignore
      showMessage(translateError[e.response.data], "error");
    }
  };

  return (
    <>
      <Image
        width={1920}
        height={1280}
        src="/login/background.svg"
        alt="background"
        className={styles.background}
        draggable={false}
      />
      <main className={styles.main}>
        <div className={styles.login}>
          <div className={styles.title}>
            <p>Bienvenido</p>
          </div>
          <div className={styles.login_container}>
            <Image
              width={375}
              height={384}
              src="/login/finish-line.svg"
              alt="finish line"
            />
            <div className={styles.form}>
              <p>Iniciar Sesión</p>
              <p>
                Hola! Bienvenido a goalKeeper - La aplicación que te ayuda a
                complir metas y estudiar de manera inteligente
              </p>

              <input
                type="text"
                name="name"
                onChange={onChange}
                placeholder="Usuario"
                value={form.name}
              />
              <input
                type="password"
                name="password"
                onChange={onChange}
                placeholder="Contraseña"
                value={form.password}
              />
              <div className={styles.register}>
                <input
                  type="checkbox"
                  onChange={onChangeChecked}
                  id="checkbox"
                  checked={register}
                />
                <label htmlFor="checkbox">Deseo registrarme</label>
              </div>
              <button onClick={onSubmit}>Comencemos!</button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;

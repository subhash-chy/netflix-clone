import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";

interface Inputs {
  email: string;
  password: string;
}

function Login() {
  const [login, setLogin] = useState(false);
  const { signIn, signUp, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
  };

  // Custom loading here
  if (loading)
    return (
      <div className="relative text-6xl text-white flex h-screen w-screen flex-col items-center justify-center">
        Loading
      </div>
    );

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Netflix</title>
      </Head>

      <Image
        className="-z-10 !hidden opacity-60 sm:!inline"
        src="https://rb.gy/p2hphi"
        layout="fill"
        objectFit="cover"
      />

      <div className="absolute left-4 top-4 w-24 h-10 cursor-pointer md:left-10 md:top-6">
        <Image
          className="cursor-pointer"
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          objectFit="contain"
          layout="fill"
          alt="Netflix logo"
        />
      </div>

      <form
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="Email"
              className="input"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="p-1 text-sm text-orange-500">
                Please enter a valid email
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="Password"
              className="input"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="p-1 text-sm text-orange-500">Incorrect password</p>
            )}
          </label>
        </div>

        <button
          onClick={() => setLogin(true)}
          type="submit"
          className="w-full rounded py-3 bg-[#e50914] "
        >
          Sign In
        </button>

        <div className="text-[gray]">
          New to Netflix?{" "}
          <button
            onClick={() => setLogin(false)}
            className="text-white hover:underline"
          >
            Signup now
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;

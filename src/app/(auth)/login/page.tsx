import Form from "@/app/components/Form/form";
import "../auth.css";
import Image from "next/image";

const Login = () => {
  return (
    <div className="black-bg w-fit h-fit relative p-10 z-3 rounded-2xl main-text-color">
      <h1 className="text-2xl font-bold">
        Sign in to <span className="special-text">Cloud Hosting</span>
      </h1>
      <p className="second-text-color mb-10 text-sm">
        Welcome back, please enter your details
      </p>
      <Form value={false} />
    </div>
  );
};

export default Login;

import Form from "@/app/components/Form/form";
import "../auth.css";
import Image from "next/image";

const Register = () => {
  return (
          <div className="black-bg mb-5 w-fit h-fit relative p-10 z-3 rounded-2xl main-text-color">
            <h1 className="text-2xl font-bold">
              Join the <span className="special-text">Cloud Revoluation</span>
            </h1>
            <p className="second-text-color mb-10 text-sm">
              Create your account and start deploying in seconds
            </p>
            <Form value={true} />
          </div>
  );
};

export default Register;

import { useForm } from "react-hook-form";
import Field from "../common/Field";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const submitForm = (formData) => {
    console.log(formData);
    const user = { email: "asd@a.com", password: "12345678" };
    const found =
      formData.email === user.email && formData.password === user.password;
    if (!found) {
      setError("root.random", {
        message: `User with email '${formData.email}' is not found`,
        type: "random",
      });
    }
  };
  return (
    <form
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
      onSubmit={handleSubmit(submitForm)}
    >
      <Field label="Email" error={errors.email}>
        <input
          {...register("email", { required: "Email is required." })}
          className={`p-2 border box-border w-[300px] rounded-md ${
            !!errors.email ? "border-red-500" : "border-gray-200"
          }`}
          type="email"
          name="email"
          id="email"
          placeholder="Enter email address"
        />
      </Field>
      <Field label="Password" error={errors.password}>
        <input
          {...register("password", {
            required: "Password is required.",
            minLength: {
              value: 8,
              message: "Yous password must be at least 8 characters!",
            },
          })}
          className={`p-2 border box-border w-[300px] rounded-md ${
            !!errors.password ? "border-red-500" : "border-gray-200"
          }`}
          type="password"
          name="password"
          id="password"
          placeholder="Enter password address"
        />
      </Field>
    </form>
  );
};

export default LoginForm;

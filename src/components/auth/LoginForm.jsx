import { useForm } from "react-hook-form";
import Field from "../common/Field";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const submitForm = async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
        formData
      );
      if (response.status === 200) {
        const { user, token } = response.data;
        if (token) {
          const authToken = token.token;
          const refreshToken = token.refreshToken;
          console.log(authToken, "token---------->");
          setAuth({ user, authToken, refreshToken });
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
      setError("root.random", {
        type: "random",
        message: `User with email ${formData.email} is not found!`,
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
          className={`auth-input ${
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
          className={`auth-input ${
            !!errors.password ? "border-red-500" : "border-gray-200"
          }`}
          type="password"
          name="password"
          id="password"
          placeholder="Enter password address"
        />
      </Field>
      <p>{errors?.root?.random?.message}</p>
      <Field>
        <button
          className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
          type="submit"
        >
          Login
        </button>
      </Field>
    </form>
  );
};

export default LoginForm;

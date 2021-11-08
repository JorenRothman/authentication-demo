import { useForm } from "react-hook-form";

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => console.log(data);

  console.log(errors);
  console.log(watch("username"));

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <form
        method="post"
        action=""
        className="grid grid-cols-1 gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="block">
          Username
          <input
            type="text"
            className="block mt-1 w-96"
            {...register("username", { required: true })}
          />
        </label>
        {errors.username && <span>required</span>}
        <label className="block">
          Password
          <input
            type="password"
            {...register("password", { required: true })}
            className="block mt-1 w-96"
          />
        </label>
        {errors.password ? <p>required</p> : null}
        <button
          type="submit"
          className="ml-auto bg-purple-500 px-6 py-2 text-white font-medium"
        >
          Login
        </button>
      </form>
    </div>
  );
}

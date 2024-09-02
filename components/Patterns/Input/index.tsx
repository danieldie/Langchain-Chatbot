import { InputType } from "@/types/InputType";

const TextInput = ({
  type = "text",
  value,
  changeHandle,
  label,
  id,
  name,
  placeholder,
  disabled,
  className,
}: InputType) => {
  return (
    <div className={`${className && className} flex flex-col items-start w-full`}>
      <label className='mb-1 font-bold text-slate-700' htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        required
        name={name}
        disabled={disabled ?? false}
        onChange={changeHandle}
        placeholder={placeholder}
        className='bg-slate-200 w-full px-2 py-2 rounded-xl border border-transparent focus:outline-0 focus:border focus:border-blue-600'
      />
    </div>
  );
};

export default TextInput;
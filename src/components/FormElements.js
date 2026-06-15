export const CheckboxRadio = ({
  id,
  labelText,
  register,
  type,
  errors,
  rules,
  value,
  name,
}) => {
  return (
    <>
      <div className="flex items-center gap-2 my-2">
        <input
          className={`w-4 h-4 text-[#FF6E13] focus:ring-[#FF6E13]/20 border-gray-300 rounded focus:ring-2 ${
          errors[name] ? "border-red-500" : ""
        }`}
          type={type}
          name={name}
          id={id}
          value={value}
          {...register(name, rules)}
        />
        {/* Radio 使用 Name 欄位 */}
        <label className="text-sm font-medium text-gray-700 cursor-pointer" htmlFor={id}>
          {labelText}
        </label>
        {errors[name] && (
          <div className="text-xs text-red-500 ml-2">{errors[name]?.message}</div>
        )}
      </div>
    </>
  );
};
export const Input = ({ id, labelText, register, type, errors, rules, placeholder }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
     
      <label htmlFor={id} className="text-sm font-semibold text-[#391A1A]">
        {labelText}
      </label>
            
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id, rules)}
        className={`
          w-full 
          h-11 
          px-4 
          bg-white 
          text-gray-900 
          border 
          rounded-lg 
          outline-none 
          transition-all 
          duration-200
          placeholder:text-gray-300
          text-base
          !border-gray-200
          focus:!border-[#FF6E13] 
          focus:!ring-4 
          focus:!ring-[#FF6E13]/10
          
          ${errors[id] ? "!border-red-500 focus:!ring-red-500/10" : ""}
        `}
      />
      
      {/* 驗證錯誤訊息提示 */}
      {errors[id] && (
        <span className="text-xs font-medium text-red-500 mt-0.5">
          {errors[id]?.message}
        </span>
      )}
    </div>
  );
};


export const Select = ({
  id,
  labelText,
  register,
  errors,
  rules,
  children,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label htmlFor={id} className="text-sm font-semibold text-[#391A1A]">
        {labelText}
      </label>
      <select
        id={id}
        {...register(id, rules)}
        disabled={disabled}
        className={`
          w-full 
          h-11 
          px-4 
          bg-white 
          text-gray-900 
          border 
          rounded-lg 
          outline-none 
          transition-all 
          duration-200
          text-base
          !border-gray-200
          focus:!border-[#FF6E13] 
          focus:!ring-4 
          focus:!ring-[#FF6E13]/10
          ${errors[id] ? "!border-red-500 focus:!ring-red-500/10" : ""}
        `}
      >
        {children}
      </select>
      {errors[id] && (
        <span className="text-xs font-medium text-red-500 mt-0.5">
          {errors[id]?.message}
        </span>
      )}
    </div>
  );
};

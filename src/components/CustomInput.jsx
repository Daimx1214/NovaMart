import { forwardRef } from "react";

/**
 * CustomInput
 * forwardRef lets a PARENT component get a real DOM ref to the
 * <input> that lives inside this child component (e.g. to call
 * .focus() on it from the Login page).
 */
const CustomInput = forwardRef(function CustomInput(
  { label, error, id, ...rest }, // spread/rest operator collects all other props
  ref
) {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block mb-1 text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        {...rest}
        className={`w-full rounded-lg border px-3 py-2 outline-none transition
          focus:ring-2 focus:ring-emerald-400
          ${error ? "border-red-400" : "border-slate-300"}`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
});

export default CustomInput;

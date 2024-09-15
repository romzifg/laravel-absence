export default function Selectbox({
    classname = "",
    options,
    currentValue,
    ...props
}) {
    return (
        <select
            {...props}
            defaultValue={currentValue}
            className={`border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full ${classname}`}
        >
            {options?.map((option, key) => (
                <option key={key} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}

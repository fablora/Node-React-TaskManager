import { useState } from "react";

const useForm = initialValues => {
    const [values, setValues] = useState(initialValues);
    const [message, setMessage] = useState();
    const [error, setError] = useState();

    const handleChange = (e) => {
        const { name, value} = e.target;
        setValues({
            ...values,
            [name] : value,
        });
    };

    return [values, handleChange, message, setMessage, error, setError];

};

export default useForm;
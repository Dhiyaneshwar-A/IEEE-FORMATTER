import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const Form = () => {
    const schema = yup.object().shape({
        name: yup.string().required("Name is required !!!"),  //manualerrormsg
        age: yup.number().positive().integer().min(18).required(),
        email: yup.string().email().required(), 
        pass: yup.string().min(4).max(20).required(),
        confirmPass: yup.string().oneOf([yup.ref("pass")], "Passwords must match").required(), 
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Name" {...register("name")} /><br></br>
            <p>{errors.name?.message}</p> {/* Display error message if validation fails */}
            <input type="number" placeholder="Age" {...register("age")} /><br></br>
            <p>{errors.age?.message}</p> {/* Display error message if validation fails */}
            <input type="text" placeholder="Email" {...register("email")} /><br></br>
            <p>{errors.email?.message}</p> {/* Display error message if validation fails */}
            <input type="text" placeholder="Password" {...register("pass")} /><br></br>
            <p>{errors.pass?.message}</p> {/* Display error message if validation fails */}
            <input type="text" placeholder="Confirm Password" {...register("confirmPass")} /><br></br>
            <p>{errors.confirmPass?.message}</p> {/* Display error message if validation fails */}
            <button type="submit">Submit</button>
        </form>
    );
};

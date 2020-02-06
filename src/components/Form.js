import React, { useState } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

function MyForm({ values, errors, touched, isSubmitting }) {
  const [users, setUsers] = useState([]);

  return (
    <div className="myForm">
      <Form>
        <label htmlFor="name">Name</label>

        {touched.name && errors.name && <p>{errors.name}</p>}
        <Field id="name" type="name" name="name" placeholder="Name" />
        <label htmlFor="email">Email</label>

        {touched.email && errors.email && <p>{errors.email}</p>}
        <Field id="email" type="email" name="email" placeholder="Email" />
        <label htmlFor="password">Password</label>

        {touched.password && errors.password && <p>{errors.password}</p>}
        <Field
          id="password"
          type="password"
          name="password"
          placeholder="Password"
        />

        <label htmlFor="gender"></label>
        <Field as="select" name="gender" id="gender">
          <option value="Choose an option">Choose an option</option>
          <option value="male">male</option>
          <option value="female">female</option>
          <option value="not specified">not specified</option>
        </Field>

        <label htmlFor="msg">
          {touched.tos && errors.tos && <p>{errors.tos}</p>}
          <Field id="tos" type="checkbox" name="tos" checked={values.tos} />
          Accept TOS
          {/* <span className="checkmark" /> */}
        </label>
        <label htmlFor="msg">Message</label>
        {touched.msg && errors.msg && <p>{errors.msg}</p>}
        <Field
          id="msg"
          as="textarea"
          type="text"
          name="msg"
          placeholder="Message"
        />

        {touched.checkbox && errors.checkbox && <p>{errors.checkbox}</p>}
        {/* disabled={isSubmitting} */}
        <button disabled={isSubmitting} type="submit">
          Submit
        </button>
      </Form>
    </div>
  );
}

const FormikLoginForm = withFormik({
  mapPropsToValues({ name, email, password, gender, msg, tos }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      gender: gender || "Choose an option",
      msg: msg || "",
      tos: tos || false
    };
  },

  //======VALIDATION SCHEMA==========
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .min(3, "Name must be between 3 and 10 characters long")
      .max(10, "Name must be between 3 and 10 characters long")
      .required("Name is required"),

    email: Yup.string()
      .email("Email not valid")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be between 6 and 12 characters long")
      .max(12, "Password must be between 6 and 12 characters long")
      .required("Password is required"),
    tos: Yup.boolean()
      .oneOf([true], "Must agree to terms to continue")
      .test(
        "is-true",
        "Must agree to terms to continue",
        value => value === true
      )
      .required("Terms of Service box is unchecked")
  }),
  //======END VALIDATION SCHEMA==========

  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    if (values.name === "john doe") {
      setErrors({
        name: "That name is already taken"
      });
    }
    // Stretch:
    if (values.email === "waffle@syrup.com") {
      setErrors({
        email: "That email is already taken"
      });
    }

    if (values.tos === false) {
      setErrors({
        tos: "The Terms of Service box is unchecked"
      });
    }

    if (!values.gender) {
      setErrors({
        gender: "Please enter your gender"
      });
    }

    if (!values.errors) {
      axios
        .post("https://reqres.in/api/users", values)
        .then(res => {
          console.log("Data was created successfully", res); // Data was created successfully and logs to console

          setSubmitting(false);
        })
        .catch(err => {
          console.log("There was an error creating the data", err); // There was an error creating the data and logs to console
          setSubmitting(false);
        });
    }
  }
})(MyForm);

export default FormikLoginForm;

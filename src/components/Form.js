import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

function MyForm({ values, errors, touched, isSubmitting }) {
  return (
    <Form>
      <label>
        Name
        {touched.name && errors.name && <p>{errors.name}</p>}
        <Field type="name" name="name" placeholder="Name" />
      </label>
      <label>
        Email
        {touched.email && errors.email && <p>{errors.email}</p>}
        <Field type="email" name="email" placeholder="Email" />
      </label>
      <label>
        Password
        {touched.password && errors.password && <p>{errors.password}</p>}
        <Field type="password" name="password" placeholder="Password" />
      </label>
      <label>
        {touched.tos && errors.tos && <p>{errors.tos}</p>}
        <Field type="checkbox" name="tos" checked={values.tos} />
        Accept TOS
      </label>
      {touched.checkbox && errors.checkbox && <p>{errors.checkbox}</p>}
      <button disabled={isSubmitting} type="button">Submit</button>
    </Form>
  );
}

const FormikLoginForm = withFormik({
  mapPropsToValues({ name, email, password, tos }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      tos: tos || true    
    };
  },

  //======VALIDATION SCHEMA==========
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .min(3, "Name must be betwwen 3 and 10 characters long")
      .max(10, "Name must be betwwen 3 and 10 characters long")
      .required("Name is required"),

    email: Yup.string()
      .email("Email not valid")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be betwwen 6 and 12 characters long")
      .max(12, "Password must be betwwen 6 and 12 characters long")
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
    if (values.email === "alreadytaken@atb.dev") {
      setErrors({
        email: "That email is already taken"
      });
    }

    if (values.tos === false) {
      setErrors({
        tos: "The Terms of Service box is unchecked"
      });
    } else {
      axios
        .post("https://reqres.in/api/users", values)
        .then(res => {
          console.log(res); // Data was created successfully and logs to console
          resetForm();
          setSubmitting(false);
        })
        .catch(err => {
          console.log(err); // There was an error creating the data and logs to console
          setSubmitting(false);
        });
    }
  }
})(MyForm);

export default FormikLoginForm;

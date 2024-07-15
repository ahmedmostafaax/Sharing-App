import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function MessageCode() {
  const [error, setError] = useState('');
  const baseUrl = "https://postbet.ae";
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    otp: Yup.string()
      .required("OTP is required")
      .min(3, "Minimum length is 3")
      .max(20, "Maximum length is 20"),
  });

  const sendCode = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema,
    onSubmit: sendCodeMessage,
  });

  async function sendCodeMessage(values) {
    setLoading(true);
    try {
      const { data } = await axios.post(`${baseUrl}/Auth/verify-otp`, { otp: values.otp });
      setLoading(false);
      console.log("Received response from API:", data);
      if (data.success === true) {
        nav("/ResetPassword");
      } else {
        setError(data.message || "An error occurred");
      }
    } catch (err) {
      console.error("API error:", err);
      setError(err.response?.data?.message || "An error occurred");
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <h3 className="py-5">Forget Password</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={sendCode.handleSubmit}>
        <div className="py-3">
          <label className="py-1" htmlFor="otp">Enter Code</label>
          <input
            onChange={sendCode.handleChange}
            onBlur={sendCode.handleBlur}
            value={sendCode.values.otp}
            className="form-control"
            type="text"
            name="otp"
            id="otp"
          />
          {sendCode.touched.otp && sendCode.errors.otp ? (
            <p className="text-danger">{sendCode.errors.otp}</p>
          ) : null}
        </div>

        {loading ? (
          <button type="button" className="btn btn-success ms-auto d-block" disabled>
            <i className="fa-solid fa-spinner fa-spin"></i> Loading...
          </button>
        ) : (
          <button
            type="submit"
            className="btn btn-warning text-white ms-auto d-block"
            disabled={!(sendCode.isValid && sendCode.dirty)}
          >
            Send
          </button>
        )}
      </form>
    </div>
  );
}
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';

export default function ChangePassword() {

    const [error, setError] = useState(null);

    async function handleSubmit(values) {
        const token = localStorage.getItem('token'); 
        if (!token) {
            setError("Token is missing");
            return;
        }
        try {
            const { data } = await axios.post('https://postbet.ae/Auth/change-password', values, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(data);
            if (data.success) {
                alert("اتغير يمعلم");
            } else {
                setError(data.message || "في حاجه غلط");
            }
        } catch (err) {
            if (err.response) {
                console.error('Response error:', err.response.data);
                setError(err.response.data.message || "Request error");
            } else {
                console.error('Request error:', err.message);
                setError(err.message || "Network error");
            }
        }
    }

    const validationSchema = Yup.object({
        oldPassword: Yup.string().required("الباسورد غلط "),
        newPassword: Yup.string().required("جط باسورد جديد عدل").matches(/^[A-Z][a-z0-9]{4,}$/i, "حط باسورد عدل يمعلم"),
    });

    const formik = useFormik({
        initialValues: {
            oldPassword: "",
            newPassword: "",
        },
        validationSchema,
        onSubmit: handleSubmit,
    });

    return (
        <div className='container py-5'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Reset Password</title>
            </Helmet>
            <h2 className="mb-4">Change Password</h2>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="oldPassword" className="mb-1">Old Password:</label>
                <input
                    className="form-control"
                    type="password"
                    id="oldPassword"
                    name="oldPassword"
                    value={formik.values.oldPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.oldPassword && formik.errors.oldPassword ? (
                    <div className="text-danger">{formik.errors.oldPassword}</div>
                ) : null}

                <label htmlFor="newPassword" className="mb-1 mt-3">New Password:</label>
                <input
                    className="form-control"
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.newPassword && formik.errors.newPassword ? (
                    <div className="text-danger">{formik.errors.newPassword}</div>
                ) : null}

                {error && <div className="text-danger mt-3">{error}</div>}

                <button
                    disabled={!(formik.isValid && formik.dirty)}
                    type="submit"
                    className="btn btn-warning text-white mt-4">
                    Reset Password
                </button>
            </form>
        </div>
    )
}
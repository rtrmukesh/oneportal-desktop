import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import LoginService from '../../services/LoginService';
import EStore from '../../lib/EStore';
import { ROLE_PERMISSION, SESSION_TOKEN, TIME_ZONE, USER_ID } from '../../Helper/EStore';
import { connectSocket } from '../../services/ScoketService';
import UserRolePermissionService from '../../services/UserRolePermissionService';

function LoginPage() {
    
  const navigate = useNavigate();

  // Validation Schema using Yup
  const validationSchema = Yup.object({
    username: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  // Handle Form submission
  const handleLogin = async (values,{ setSubmitting }) => {
    const { username, password } = values;
    let data = {
        email: username,
        password: password,
    }
    await LoginService.login(data,async (error,response) => {
        if (response?.user) {
            const {
                token,
                role,
                id,
                email,
                firstName,
                lastName,
                portal_name,
                time_zone,
                companyId
              } = response?.user;

              await EStore.setItem(SESSION_TOKEN, token);
              await EStore.setItem(TIME_ZONE, time_zone);
              await EStore.setItem(USER_ID, id);
              connectSocket(id)

              let permissionList = await UserRolePermissionService.getPermission()
              var values = permissionList.data.data.map((obj) => obj.role_permission);
    
              // Convert the array to a comma-separated string
              var valuesString = values.join(",");
              await EStore.setItem(ROLE_PERMISSION, valuesString);
              navigate('/message')

        }

        if(error){
          setSubmitting(false)
          alert(error);
        }
    })
   
  };

  return (
    <div className="login-container">
      <div className="login-title">Login</div>
      <div className="login-subtitle">Enter your email and password to continue</div>

      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        <FormikForm className="login-form">
            <Field
              type="text"
              name="username"
              placeholder="Email Address or Mobile Number"
              className="input-field"
            />
            <ErrorMessage name="username" component="div" className="error-message" />

            <Field
              type="password"
              name="password"
              placeholder="Password"
              className="input-field"
            />
            <ErrorMessage name="password" component="div" className="error-message" />

          <div className="checkbox-row">
            <label>
              <input type="checkbox" /> Remember my username
            </label>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" className="login-button">Login</button>
        </FormikForm>
      </Formik>
    </div>
  );
}

export default LoginPage;

import React from 'react';
import { Formik, Field, Form } from 'formik';
import moment from "moment";
import { useDispatch } from "react-redux";
import * as Yup from 'yup';
import { registerUser } from "../../../_actions/user_actions";

//antd 안씁니다~~ 
import {
  Input,
  Button,
  Select,
} from 'antd';

function RegisterPage(props) {
  const dispatch = useDispatch();
  return (

    <Formik
      initialValues={{
        email: '',
        lastName: '',
        name: '',
        password: '',
        confirmPassword: '',
        interested: [],
        line: '',
        school: '',
        academic: '',
        achievement: '',
        income: '',
        info: '',
      }}

      validationSchema={Yup.object().shape({
        name: Yup.string()
          .required('Name is required'),
        lastname: Yup.string()
          .required('Last Name is required'),
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
      })}

      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {

          let dataToSubmit = {
            name: values.name,
            lastname: values.lastname,
            email: values.email,
            password: values.password,
            interested: values.interested,
            line: values.line,
            school: values.school,
            academic: values.academic,
            achievement: values.achievement,
            income: values.income,
            info: values.info,
            image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
          };

          dispatch(registerUser(dataToSubmit)).then(response => {
            if (response.payload.success) {
              props.history.push("/login");
            } else {
              alert(response.payload.err.errmsg)
            }
          })

          setSubmitting(false);
        }, 400);
      }}
    >

    {props => {
      const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      } = props;

      return(
        <div className="app">
          <h2>Sign up</h2>
          <Form style={{ minWidth: '375px' }} onSubmit={handleSubmit} >
            <p>name</p>
            <Field
              name="name"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            {errors.name && touched.name}

            <br/>
            <p>lastname</p>
            <Field
              name="lastname"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastname}
            />
            {errors.lastname && touched.lastname}

            <br/>
            <p>email</p>
            <Field
              name="email"
              type="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email}
            <br/>

            <p>패스워드</p>
            <Field
              name="password"
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password}
            <br/>

            <p>패스워드 확인</p>
            <Field
              name="confirmPassword"
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
            />
            {errors.confirmPassword && touched.confirmPassword}
            <br/>

            <p>관심분야</p>
            <label>
             <input
               type="checkbox"
               name="interested"
               value="장학금"
               checked={values.interested.includes('장학금')}
               onChange={handleChange}
               onBlur={handleBlur}
             />
             장학금
           </label>
           <label>
             <input
               type="checkbox"
               name="interested"
               value="학자금"
               checked={values.interested.includes('학자금')}
               onChange={handleChange}
               onBlur={handleBlur}
             />
            학자금
           </label>
           <label>
             <input
               type="checkbox"
               name="interested"
               value="기숙사/학사"
               checked={values.interested.includes('기숙사/학사')}
               onChange={handleChange}
               onBlur={handleBlur}
             />
             기숙사/학사
           </label>
           <label>
             <input
               type="checkbox"
               name="interested"
               value="기타"
               checked={values.interested.includes('기타')}
               onChange={handleChange}
               onBlur={handleBlur}
             />
             기타
           </label>
            {errors.interested && touched.interested}

            <br/>
            <p>지원계열</p>
            <Field
              as="select"
              name="line"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.line}
            >
              <option value="이공계">이공계</option>
              <option value="인문계">인문계</option>
              <option value="예체능">예체능</option>
            </Field>
            {errors.line && touched.line}

            <br/>
            <p>학교</p>
            <Field
              name="school"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.school}
            />
            {errors.school && touched.school}

            <br/>

            <p>학적</p>
            <Field
              as="select"
              id="academic"
              name="academic"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.academic}
            >
              <option value="재학">재학</option>
              <option value="휴학">휴학</option>
              <option value="졸업">졸업</option>
            </Field>
            {errors.academic && touched.academic}

            <br/>
            <p>학점</p>
            <Field
              name="achievement"
              type="number"
              step="0.01"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.achievement}
            />
            {errors.achievement && touched.achievement}

            <p>소득분위</p>
            <Field
              name="income"
              type="number"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.income}
            />만원
            {errors.income && touched.income}

            <p>특수정보</p>
            <Field
              name="info"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.info}
            />
            {errors.info && touched.info}

            
            <br/>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        </div>
      );
    }}
    </Formik>
  );
};
export default RegisterPage;

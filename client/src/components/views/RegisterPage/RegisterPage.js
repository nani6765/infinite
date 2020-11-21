import React from 'react';
import { Formik, Field, Form } from 'formik';
import moment from "moment";
import { useDispatch } from "react-redux";
import * as Yup from 'yup';
import { registerUser } from "../../../_actions/user_actions";
import styles from "./RegisterPage.css";

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
        info: []
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
              alert("여기가 문제임?")
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
          <h1>Sign up</h1>
          <br/>
          <Form style={{ minWidth: '375px' }} onSubmit={handleSubmit} >
            <span className="right">Name:&nbsp;</span>
            <Field 
              className="field"
              name="name"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            {errors.name && touched.name}
            

            <br/><br/>
            <span className="right">Last Name: &nbsp;</span>
            <Field 
              className="field"
              name="lastname"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastname}
            />
            {errors.lastname && touched.lastname}
            

            <br/><br/>
            <span className="right">Email: &nbsp;</span>
            <Field 
              className="field"
              name="email"
              type="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email}
            
            <br/><br/>

            <span className="right">Password: &nbsp;</span>
            <Field
              className="field"
              name="password"
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password}
          
            <br/><br/>

            <span className="right">Confirm: &nbsp;</span>
            <Field
              className="field"
              name="confirmPassword"
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
            />
            {errors.confirmPassword && touched.confirmPassword}
            
            <br/><br/>

            <span className="right">Interested: &nbsp;</span>
            <br/>
            <label>
             <input
               type="checkbox"
               name="interested"
               value="장학금"
               checked={values.interested.includes('장학금')}
               onChange={handleChange}
               onBlur={handleBlur}
             />
              &nbsp;장학금&nbsp;&nbsp;
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
             &nbsp;학자금&nbsp;&nbsp;
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
              &nbsp;기숙사/학사&nbsp;&nbsp;
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
              &nbsp;기타&nbsp;
           </label>
            {errors.interested && touched.interested}
            

            <br/><br/>
            <span className="right">지원계열: &nbsp;</span>
            <Field
              className="field"
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
            

            <br/><br/>
            <span className="right">학교: &nbsp;</span>
            <Field
              className="field"
              name="school"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.school}
            />
            {errors.school && touched.school}
            

            <br/><br/>

            <span className="right">학적: &nbsp;</span>
            <Field
              className="field"
              as="select"
              id="academic"
              name="academic"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.academic}
              default=""
            >
              <option value="재학">재학</option>
              <option value="휴학">휴학</option>
              <option value="수료">수료</option>
              <option value="졸업">졸업</option>
            </Field>
            {errors.academic && touched.academic}
            

            <br/><br/>
            <span className="right">학점: &nbsp;</span>
            <Field
              className="field"
              name="achievement"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="4.5 만점 기준"
              value={values.achievement}
            />
            {errors.achievement && touched.achievement}
            
            <br/><br/>
            <span className="right">소득분위: &nbsp;</span>
            <Field
              className="field"
              name="income"
              as = "select"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.income}> 
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              &nbsp;분위
            </Field>
            {errors.income && touched.income}
            
            <br/><br/>
            <span className="right">특수정보: &nbsp;</span>
            <br/>
            <span className="check">
            <label>
             <input
               type="checkbox"
               name="info"
               value="다문화가정"
               checked={values.info.includes('다문화가정')}
               onChange={handleChange}
               onBlur={handleBlur}
             />
              &nbsp;다문화가정&nbsp;&nbsp;
           </label>
           <label>
             <input
               type="checkbox"
               name="info"
               value="기초생활수급자"
               checked={values.info.includes('기초생활수급자')}
               onChange={handleChange}
               onBlur={handleBlur}
             />
             &nbsp;기초생활수급자&nbsp;&nbsp;
           </label>
           <label>
             <input
               type="checkbox"
               name="info"
               value="차상위계층"
               checked={values.info.includes('차상위계층')}
               onChange={handleChange}
               onBlur={handleBlur}
             />
              &nbsp;차상위계층&nbsp;&nbsp;
           </label>
           <label>
             <input
               type="checkbox"
               name="info"
               value="장애인"
               checked={values.info.includes('장애인')}
               onChange={handleChange}
               onBlur={handleBlur}
             />
              &nbsp;장애인&nbsp;
           </label>
           <label>
             <input
               type="checkbox"
               name="info"
               value="새터민"
               checked={values.info.includes('새터민')}
               onChange={handleChange}
               onBlur={handleBlur}
             />
              &nbsp;새터민&nbsp;
           </label>
           <br/>
           <label>
             <input
               type="checkbox"
               name="info"
               value="농어촌자녀"
               checked={values.info.includes('농어촌자녀')}
               onChange={handleChange}
               onBlur={handleBlur}
             />
              &nbsp;농어촌자녀&nbsp;
           </label>
           <label>
             <input
               type="checkbox"
               name="info"
               value="보훈대상자"
               checked={values.info.includes('보훈대상자')}
               onChange={handleChange}
               onBlur={handleBlur}
             />
              &nbsp;보훈대상자&nbsp;
           </label>
           <label>
             <input
               type="checkbox"
               name="info"
               value="조부모가정"
               checked={values.info.includes('조부모가정')}
               onChange={handleChange}
               onBlur={handleBlur}
             />
              &nbsp;조부모가정&nbsp;
           </label>
           <label>
             <input
               type="checkbox"
               name="info"
               value="한부모"
               checked={values.info.includes('한부모')}
               onChange={handleChange}
               onBlur={handleBlur}
             />
              &nbsp;한부모&nbsp;
           </label>
           <label>
             <input
               type="checkbox"
               name="info"
               value="학생가장"
               checked={values.info.includes('학생가장')}
               onChange={handleChange}
               onBlur={handleBlur}
             />
              &nbsp;학생가장&nbsp;
           </label>
           </span>
            {errors.info && touched.info}
          
            <br/>
            <button className="button" type="submit" disabled={isSubmitting}>
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
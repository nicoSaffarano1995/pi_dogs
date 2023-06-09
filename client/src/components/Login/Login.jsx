import { useState } from "react";
import validation from "./validation";
import style from "./Login.module.css";
import { NavLink } from "react-router-dom";
import { RiEyeLine,RiEyeCloseLine } from "react-icons/ri";

const Login = ({ login }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });

    const validateErrors = validation({
      ...userData,
      [event.target.name]: event.target.value,
    });

    setErrors(validateErrors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(userData);
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <form onSubmit={handleSubmit} className={style.formContainer}>
      <div>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Email or Username"
          className={style.inputEmail}
        />
        {errors.email && (
          <p className={style.validationEmail}>{errors.email}</p>
        )}
      </div>

      <div>
        <input
          type={passwordVisible ? "text" : "password"}
          name="password"
          value={userData.password}
          onChange={handleChange}
          placeholder="Password"
          className={style.inputPass}
        />
      </div>
      <div className={style.helpLinksContainer}>
        <NavLink className={style.helpLinkPass}>
          Did you forgot your password?
        </NavLink>
        <NavLink className={style.helpLinkAccount}>
          Don't you have an account?
        </NavLink>
      </div>
      {errors.password && (
        <p className={style.validationPass}>{errors.password}</p>
      )}
       <button className={style.btnShowPass} type="button" onClick={togglePasswordVisibility}>
        {passwordVisible ? <RiEyeCloseLine className={style.eye}/> : <RiEyeLine className={style.eye}/>}
      </button>
      <button
        className={style.btnLogin}
        type="submit"
        disabled={errors.email || errors.password}
      >
        LOGIN
      </button>
    </form>
  );
};

export default Login;

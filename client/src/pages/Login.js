import React, { useContext, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { AuthContext } from "../context/auth";
import { useForm } from "../util/hooks";

import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import "./Login.css";
import { LOGIN_USER } from "../util/graphql";

function Login(props) {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        username: "",
        password: "",
    });

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, { data: { login: userData } }) {
            context.login(userData);
            props.history.push("/");
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values,
    });

    function loginUserCallback() {
        loginUser();
    }
    return (
        <div className="login">
            <div className="login__container">
                <div className="login__logo">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Quora_logo_2015.svg/250px-Quora_logo_2015.svg.png"
                        alt=""
                    />
                </div>
                <div className="login__desc">
                    <p>
                        A Place to Share knowledge and better understand the
                        world
                    </p>
                </div>
                <div className="login__auth">
                    <div className="login__authOptions">
                        <div className="login__authOption">
                            <img
                                className="login__googleAuth"
                                src="https://media-public.canva.com/MADnBiAubGA/3/screen.svg"
                                alt=""
                            />
                            <p /*onClick={signIn}*/>Continue With Google</p>
                        </div>
                        <div className="login__authOption">
                            <img
                                className="login__googleAuth"
                                src="https://1000logos.net/wp-content/uploads/2016/11/Facebook-logo-500x350.png"
                                alt=""
                            />
                            <span>Continue With Facebook</span>
                        </div>
                        <Link className="login__authOption" to="/register">
                            Sign up with email
                        </Link>
                        <div className="login__authDesc">
                            <p>
                                By continuing you indicate that you have read
                                and agree to Quora's
                                <span
                                    style={{ color: "blue", cursor: "pointer" }}
                                >
                                    Terms of Service{" "}
                                </span>
                                and{" "}
                                <span
                                    style={{ color: "blue", cursor: "pointer" }}
                                >
                                    Privacy Policy
                                </span>
                                .
                            </p>
                        </div>
                    </div>
                    <div className="login__emailPass">
                        <div className="login__label">
                            <h3>Login</h3>
                        </div>
                        <Form
                            onSubmit={onSubmit}
                            noValidate
                            className={loading ? "loading" : ""}
                        >
                            <div className="login__inputFields">
                                <div className="login__inputField">
                                    <Form.Input
                                        label="Username"
                                        placeholder="Username.."
                                        name="username"
                                        type="text"
                                        value={values.username}
                                        error={errors.username ? true : false}
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="login__inputField">
                                    <Form.Input
                                        label="Password"
                                        placeholder="Password.."
                                        name="password"
                                        type="password"
                                        value={values.password}
                                        error={errors.password ? true : false}
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                            <div className="login__forgButt">
                                <small>Forgot Password?</small>
                                <Button type="submit" primary>
                                    Login
                                </Button>
                            </div>
                        </Form>
                        {Object.keys(errors).length > 0 && (
                            <div className="ui error message">
                                <ul className="list">
                                    {Object.values(errors).map((value) => (
                                        <li key={value}>{value}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <div className="login__lang">
                    <p>हिन्दी</p>
                    <ArrowForwardIosIcon fontSize="small" />
                </div>
                <div className="login__footer">
                    <p>About</p>
                    <p>Languages</p>
                    <p>Careers</p>
                    <p>Businesses</p>
                    <p>Privacy</p>
                    <p>Terms</p>
                    <p>Contact</p>
                </div>
            </div>
        </div>
    );
}

export default Login;

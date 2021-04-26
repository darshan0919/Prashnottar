import React from "react";
import { Button, Form } from "semantic-ui-react";

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import "./Login.css";
import { useRegisterUserMutation } from "../hooks/user/registerUser";

function Register(props) {
    const {
        errors,
        onChange,
        onSubmit,
        values,
        loading,
    } = useRegisterUserMutation(props);
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
                <div className="login__emailPass">
                    <div className="login__label">
                        <h3>Sign up</h3>
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
                                    label="Email"
                                    placeholder="Email.."
                                    name="email"
                                    type="email"
                                    value={values.email}
                                    error={errors.email ? true : false}
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
                            <div className="login__inputField">
                                <Form.Input
                                    label="Confirm Password"
                                    placeholder="Confirm Password.."
                                    name="confirmPassword"
                                    type="password"
                                    value={values.confirmPassword}
                                    error={
                                        errors.confirmPassword ? true : false
                                    }
                                    onChange={onChange}
                                />
                            </div>
                        </div>
                        <div className="login__forgButt">
                            <Button type="submit" primary>
                                Sign up
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

export default Register;

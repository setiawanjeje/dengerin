import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { login } from "../reducer/reducer";

function Home(props) {
  const router = useRouter();

  const handleSubmit = (value, { setSubmitting }) => {
    props.onLogin({
      roomName: value.roomName,
      username: value.username,
    });
    // console.log(props);
    router.push(`/room/${value.roomName}`);
  };

  const validateForm = (values) => {
    const errors = {};
    if (!values.roomName) {
      errors.roomName = "Required";
    }
    if (!values.username) {
      errors.username = "Required";
    }
    return errors;
  };

  return (
    <div
      className="py-2 px-4 h-screen flex flex-col justify-center"
      style={{
        background:
          "linear-gradient(135deg, rgba(244,134,110,1) 0%, rgba(246,172,27,1) 100%)",
      }}
    >
      <div className="text-white text-2xl text-center font-bold mb-16">
        Denger.in
      </div>
      <Formik
        onSubmit={handleSubmit}
        validate={validateForm}
        initialValues={{ roomName: "", username: "" }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label
                className="block w-full text-center text-white mb-2"
                htmlFor="roomName"
              >
                Room Name
              </label>
              <Field
                className="block w-full border-2 px-4 py-2"
                id="roomName"
                name="roomName"
              />
              <ErrorMessage
                className="text-white font-bold"
                name="roomName"
                component="div"
              />
            </div>
            <div className="mb-4">
              <label
                className="block w-full text-center text-white mb-2"
                htmlFor="username"
              >
                Your Name
              </label>
              <Field
                className="block w-full border-2 px-4 py-2"
                id="username"
                name="username"
              />
              <ErrorMessage
                className="text-white font-bold"
                name="username"
                component="div"
              />
            </div>
            <div className="flex justify-center mt-5">
              <button
                className="border-2 py-2 px-4 rounded font-bold text-white"
                disabled={isSubmitting}
                type="submit"
              >
                Join Room
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

const mapDispatchTopProps = (dispatch) => {
  return {
    onLogin: (payload) => dispatch(login(payload)),
  };
};

const mapStateToProps = (state) => {
  return {
    roomName: state.roomName,
  };
};

export default connect(mapStateToProps, mapDispatchTopProps)(Home);

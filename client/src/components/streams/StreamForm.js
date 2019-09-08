//We dont need to call e.preventDefault() because redux-form does that for us

import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";


class StreamForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  // renderInput(formProps) {
  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input
          // onChange={formProps.input.onChange}
          // value={formProps.input.value}
          {...input}
          autoComplete="off"
        />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "You must enter title";
  }
  if (!formValues.description) {
    errors.description = "You must enter description";
  }
  return errors;
};

// export default connect()(
//   reduxForm({
//     form: "streamCreate",
//     validate
//   })(StreamForm)
// );

export default reduxForm({
  form: "streamForm",
  validate
})(StreamForm);



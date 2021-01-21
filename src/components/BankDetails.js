import React, { Component } from "react";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
class BankDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banks: [],
      id: null,
    };
  }
  componentDidMount() {
    this.setState({ id: this.props.match.params.id });

    axios
      .get("https://fyle-internship-bank-api.herokuapp.com/banks")
      .then((result) => {
        this.setState({
          banks: result.data,
        });
      })
      .catch((error) => console.log(error));
  }
  render() {
    return (
      <div>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to='/home'>Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Bank</BreadcrumbItem>
        </Breadcrumb>
        {this.state.banks ? (
          this.state.banks.map((data) => {
            if (data.id + "" === this.state.id + "") {
              return (
                <div style={{ margin: "10rem" }}>
                  <h1>ID: {data.id}</h1>
                  <h1>Bank Name: {data.name}</h1>
                </div>
              );
            }
          })
        ) : (
          <h1>No data found</h1>
        )}
      </div>
    );
  }
}
export default withRouter(BankDetails);

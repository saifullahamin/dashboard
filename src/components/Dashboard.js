import React, { Component } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import "./dashboard.css";
import { Col, Row, Container } from "react-bootstrap";
import WidgetText from "./widgetText";
import WidgetBar from "./widgetBar";
import WidgetDoughnut from "./widgetDoughnut";
import WidgetHeading from "./widgetHeading";
import WidgetPareto from "./widgetPareto";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const config = {
  apiKey: "AIzaSyDMu-Vw30ykPPmFT3cXeunzKEi4EahzglI",
  spreadsheetId: "1vcDPrMexD8bxNwwzK9IxF8wch6Hfezq2eooJACDiqgg",
};
const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      dropdownOptions: [],
      sourceArray: [],
      userArray: [],
      sessionsArray: [],
      selectedValue: null,
      organicSourceViews: null,
      directSourceViews: null,
      referralSourceViews: null,
      socialSourceViews: null,
      emailSourceViews: null,
      pageViews: null,
      users: null,
      newUsers: null,
      sessions: null,
      sessionsPerUser: null,
      pagePerSession: null,
      avgSessionTime: null,
      bounceRate: null,
    };
  }

  getData = (arg) => {
    const arr = this.state.items;
    const arrLen = arr.length;
    let organicSourceViews = 0;
    let directSourceViews = 0;
    let referralSourceViews = 0;
    let socialSourceViews = 0;
    let emailSourceViews = 0;
    let pageViews = 0;
    let users = 0;
    let newUsers = 0;
    let sessions = 0;
    let sessionsPerUser = 0;
    let pagePerSession = 0;
    let avgSessionTime = 0;
    let bounceRate = 0;
    let selectedValue = null;
    let sourceArray = [];
    let userArray = [];
    let sessionsArray = [];

    for (let i = 0; i < arrLen; i++) {
      if (arg === arr[i]["month"]) {
        organicSourceViews = arr[i].organic_source;
        directSourceViews = arr[i].direct_source;
        referralSourceViews = arr[i].referral_source;
        socialSourceViews = arr[i].social_source;
        emailSourceViews = arr[i].email_source;
        pageViews = arr[i].page_views;
        users = arr[i].users;
        newUsers = arr[i].new_users;
        sessions = arr[i].sessions;
        sessionsPerUser = arr[i].number_of_sessions_per_users;
        pagePerSession = arr[i].page_per_session;
        avgSessionTime = arr[i].avg_session_time;
        bounceRate = arr[i].bounce_rate;

        sourceArray.push(
          {
            label: "Organic Source",
            value: arr[i].organic_source,
          },
          {
            label: "Direct Source",
            value: arr[i].direct_source,
          },
          {
            label: "Referral Source",
            value: arr[i].referral_source,
          },
          {
            label: "Social Source",
            value: arr[i].social_source,
          },
          {
            label: "Email Source",
            value: arr[i].email_source,
          }
        );
        userArray.push(
          {
            label: "Users",
            value: arr[i].users,
          },
          {
            label: "New Users",
            value: arr[i].new_users,
          }
        );
        sessionsArray.push(
          {
            label: "Number of Sessions per User",
            value: arr[i].number_of_sessions_per_users,
          },
          {
            label: "Page per Sesion",
            value: arr[i].page_per_session,
          },
          {
            label: "Average Session Time",
            value: arr[i].avg_session_time,
          },
          {
            label: "Bounce Rate",
            value: arr[i].bounce_rate,
          }
        );
      }
    }
    selectedValue = arg;

    this.setState({
      organicSourceViews: organicSourceViews,
      directSourceViews: directSourceViews,
      referralSourceViews: referralSourceViews,
      pageViews: pageViews,
      users: users,
      newUsers: newUsers,
      sourceArray: sourceArray,
      userArray: userArray,
      sessionsArray: sessionsArray,
      socialSourceViews: socialSourceViews,
      emailSourceViews: emailSourceViews,
      sessions: sessions,
      sessionsPerUser: sessionsPerUser,
      pagePerSession: pagePerSession,
      avgSessionTime: avgSessionTime,
      bounceRate: bounceRate,
    });
  };

  updateDashboard = (event) => {
    this.getData(event.value);
    this.setState({ selectedValue: event.value });
  };

  componentDidMount() {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let batchRowValues = data.valueRanges[0].values;

        const rows = [];

        for (let i = 1; i < batchRowValues.length; i++) {
          let rowObject = {};
          for (let j = 0; j < batchRowValues[i].length; j++) {
            rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
          }
          rows.push(rowObject);
        }

        // dropdown options
        let dropdownOptions = [];

        for (let i = 0; i < rows.length; i++) {
          dropdownOptions.push(rows[i].month);
        }

        dropdownOptions = Array.from(new Set(dropdownOptions)).reverse();
        this.setState(
          {
            items: rows,
            dropdownOptions: dropdownOptions,
            selectedValue: "Jan 2018",
          },
          () => this.getData("Jan 2018")
        );
      });
  }

  render() {
    return (
      <div>
        <Container className="TopHeader">
          <Row>
            <Col>Dashboard</Col>
            <Col>
              <Dropdown
                options={this.state.dropdownOptions}
                onChange={this.updateDashboard}
                value={this.state.selectedValue}
              />
            </Col>
          </Row>
        </Container>
        <Container className="mainDashboard">
          <Row className="heading">
            <Col>
              <WidgetHeading heading="SOURCES" />
            </Col>
          </Row>
          <Row>
            <Col>
              <WidgetText
                title="Organic Source"
                value={this.state.organicSourceViews}
              />
            </Col>
            <Col>
              <WidgetText
                title="Direct Source"
                value={this.state.directSourceViews}
              />
            </Col>
            <Col>
              <WidgetText
                title="Referral Source"
                value={this.state.referralSourceViews}
              />
            </Col>
            <Col>
              <WidgetText
                title="Social Source"
                value={this.state.socialSourceViews}
              />
            </Col>
            <Col>
              <WidgetText
                title="Email Source"
                value={this.state.emailSourceViews}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <WidgetBar
                title="Sources Comparison"
                data={this.state.sourceArray}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <WidgetDoughnut
                title="Sources Doughnut"
                data={this.state.sourceArray}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <WidgetPareto
                title="Sources Pareto"
                data={this.state.sourceArray}
              />
            </Col>
          </Row>
          <Row className="heading">
            <Col>
              <WidgetHeading heading="PAGES" />
            </Col>
          </Row>
          <Row>
            <Col className="col-6">
              <WidgetText title="Page Views" value={this.state.pageViews} />
            </Col>
            <Col>
              <WidgetText title="Users" value={this.state.users} />
            </Col>
            <Col>
              <WidgetText title="New Users" value={this.state.newUsers} />
            </Col>
          </Row>

          <Row>
            <Col>
              <WidgetDoughnut
                title="Users Comparison"
                data={this.state.userArray}
              />
            </Col>
            <Col>
              <WidgetBar title="User Comparison" data={this.state.userArray} />
            </Col>
          </Row>
          <Row>
            <Col>
              <WidgetHeading heading="SESSIONS" />
            </Col>
          </Row>
          <Row>
            <Col>
              <WidgetText title="Sessions" value={this.state.sessions} />
            </Col>
            <Col>
              <WidgetText
                title="Sessions per User"
                value={this.state.sessionsPerUser}
              />
            </Col>
            <Col>
              <WidgetText
                title="Page per Session"
                value={this.state.pagePerSession}
              />
            </Col>
            <Col>
              <WidgetText
                title="Average Session Time"
                value={this.state.avgSessionTime}
              />
            </Col>
            <Col>
              <WidgetText title="Bounce Rate" value={this.state.bounceRate} />
            </Col>
          </Row>
          <Row>
          <Col>
              <WidgetBar
                title="Sessions Bar"
                data={this.state.sessionsArray}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Dashboard;

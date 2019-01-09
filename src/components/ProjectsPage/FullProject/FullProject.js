import React, { Component } from "react";
import axios from "axios";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router";
import PageHeader from "../../PageHeader/PageHeader";
import "./FullProject.scss";
import createMarkup from "../../../helpers/dangerouslySetHTML";

// import projectFullImg from "../../../img/pageprojectImg.png";
import headerProjectImg from "../../../img/project-flag.png";
import project1 from "../../../img/project1.png";
import project2 from "../../../img/project2.png";
import project3 from "../../../img/project3.png";
import project4 from "../../../img/project4.png";
import project5 from "../../../img/project5.png";
import project6 from "../../../img/project6.png";

@inject("projectsStore")
@observer
class FullProject extends Component {
  state = {
    selectedProject: null,
    loading: true
  };

  componentDidMount() {
    // this.props.projectsStore.content()
    const { id } = this.props.match.params;

    axios
      .get(`/api/v1/projects/${id}`)
      .then(response => {
        console.log(response);
        this.setState({
          selectedProject: response.data,
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { selectedProject } = this.state;

    const pageHeader = {
      breadCrumbs: true,
      title: this.state.selectedProject && this.state.selectedProject.title,
      headerModifierClass: "",
      background: "#005a80",
      description: true,
      descriptionGoal:
        this.state.selectedProject && this.state.selectedProject.text,
      descriptionRealisation:
        this.state.selectedProject && this.state.selectedProject.realize,
      descriptionSite:
        this.state.selectedProject && this.state.selectedProject.site,
      headerProjectImg:
        this.state.selectedProject &&
        this.state.selectedProject.thumb_urls.projectIco &&
        this.state.selectedProject.thumb_urls.projectIco.original,
      selectedProject: selectedProject,
      linkBlock: false
    };
    console.log(pageHeader);

    return (
      <React.Fragment>
        <PageHeader {...pageHeader} />
        <div className="project-page__content-top-new">
              <div className="project-page__content-top-new__image" style={{
                width: '54%',
                maxHeight: '467px',
                background: `url(${
                  this.state.selectedProject &&
                  this.state.selectedProject.thumb_urls &&
                  this.state.selectedProject.thumb_urls.projectImage !== undefined
                    ? this.state.selectedProject.thumb_urls.projectImage
                        .original
                    : ""
                }) center / contain no-repeat`,
                paddingTop: '233px',
                paddingBottom: '233px',
                  marginBottom: "30px"
              }}/>
              <div className="project-page__content-top-new__target">
                <div className="project-page__content-top-new__target__card">
                  <span className="project-page__content-top-new__target__card__title">Цель проекта:</span><br />
                  {this.state.selectedProject && this.state.selectedProject.text}
                </div>
              </div>
            </div>
        <div className="project-page__container">
          <div className="project-page__content">
            <div className="project-page__content-top">
              {/* <div
                style={{
                  float: "left",
                  height: "258px",
                  width: "440px",
                  background: `url(${
                    this.state.selectedProject &&
                    this.state.selectedProject.thumb_urls &&
                    this.state.selectedProject.thumb_urls.projectImage !== undefined
                      ? this.state.selectedProject.thumb_urls.projectImage
                          .original
                      : ""
                  }) center / contain no-repeat`,
                  marginRight: "37px",
                  marginTop: "22px",
                  marginBottom: "30px"
                }}
              /> */}
              <div className="project-page__fulltext"
                dangerouslySetInnerHTML={createMarkup(
                  this.state.selectedProject &&
                    this.state.selectedProject.fulltext
                )}
                
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(FullProject);

FullProject.defaultProps = {
  pageHeader: {
    breadCrumbs: false,
    title: "Федеральный портал «Российское образование»",
    headerModifierClass: "",
    background: "#005a80",
    description: true,
    descriptionGoal:
      "Федеральный портал «Российское образование» зарегистрирован как средство массовой информации",
    descriptionRealisation: "функционирует в сети Интернет с 2002 года",
    descriptionSite: "http://edu.ru/",
    headerProjectImg: headerProjectImg,
    linkBlock: false
  },

  projects: [
    {
      img: project1,
      header: "базы данных российских образовательных учреждений",
      text: ""
    },
    {
      img: project2,
      header:
        "архив федеральных государственных образовательных стандартов нового поколения",
      text:
        "для общего, начального, среднего и высшего профессионального образования"
    },
    {
      img: project3,
      header: "подсистема он-лайн тестирования",
      text:
        "подготовка к Единому государственному экзамену (ЕГЭ) и государственной итогой аттестации (ОГЭ)"
    },
    {
      img: project4,
      header: "раздел «Абитуриенту",
      text:
        "информация об образовательных учреждениях, сроках и порядке проведения ЕГЭ, ГИА и ГВЭ, порядок приема вузы и ссузы, олимпиады для школьников и т.д."
    },
    {
      img: project5,
      header: "база данных «Мероприятия»",
      text:
        "информация о конференциях, семинарах, выставках и других событиях в жизни научно-образовательного сообщества"
    },
    {
      img: project6,
      header: "система новостных лент",
      text: ""
    }
  ]
};

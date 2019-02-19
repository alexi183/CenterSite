import React, { Component } from "react";
import "./PhoneBook.scss";
import PageTitleNavBlock from "../../PageTitleNavBlock/PageTitleNavBlock";
import { inject, observer } from "mobx-react";
import Select from "react-select";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import EmployeeCard from "./EmployeeCard";
import { SmallCross } from "../../Elements/Icons/Icons";
import DocumentTitle from "react-document-title";

@withRouter
@inject("contactsStore")
@observer
class PhoneBook extends Component {
  state = {
    onShow: { display: "none" }
  };

  componentDidMount() {
    this.props.contactsStore.getDepartments();
    this.props.contactsStore.selectEmployee();
    this.getParamsFromUrl(true);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    window.onpopstate = () => {
      this.getParamsFromUrl();
      this.props.contactsStore.getStuff();
    };
  }

  componentWillUnmount() {
    window.onpopstate = undefined;
  }

  notFound = () => {
    let initQuery = queryString.parse(this.props.location.search);

    return (
      Object.keys(initQuery).length > 0 &&
      this.props.contactsStore.staff.length < 1
    );
  };

  handleDepartmentLink = id => {
    this.handleHistory(``, `department=${id}`);
    this.props.contactsStore.setDepartment(id);
    this.props.contactsStore.setEmploee("");
    this.props.contactsStore.getStuff();
  };

  submitQuery = e => {
    e.preventDefault();
    this.handleHistory(
      `employee=${this.props.contactsStore.employee}`,
      `&department=${this.props.contactsStore.department}`
    );
    this.props.contactsStore.getStuff();
  };

  onDepartmentChange = option => {
    const value = option ? option.value : 1;
    this.props.contactsStore.setDepartment(value);
    this.props.contactsStore.setEmploee("");
    // this.props.contactsStore.staffForSelect.filter(item => item.department === this.props.contactsStore.department)
    this.handleHistory(
      `employee=${this.props.contactsStore.employee}`,
      `&department=${this.props.contactsStore.department}`
    );
    this.props.contactsStore.selectEmployee();
    this.props.contactsStore.getStuff();
    // this.props.contactsStore.setEmploee("");
    // console.log(this.props.contactsStore.staffForSelect.map(item => item.department) , this.props.contactsStore.department)
  };

  getParamsFromUrl = mount => {
    const { setEmploee, setDepartment } = this.props.contactsStore;
    let initQuery = queryString.parse(this.props.location.search);

    if (Object.keys(initQuery).length > 0) {
      setDepartment(initQuery.department ? +initQuery.department : null);
      setEmploee(initQuery.employee ? initQuery.employee : "");
      if (mount) {
        this.props.contactsStore.getStuff();
      }
    }
  };

  onQueryChange = option => {
    const value = option ? option.value : 1;
    this.props.contactsStore.setEmploee(value);
    this.handleHistory(
      `employee=${this.props.contactsStore.employee}`,
      `&department=${this.props.contactsStore.department}`
    );
    this.props.contactsStore.getStuff();
    this.setState({
      onShow: { display: "block" }
    });
    // this.props.contactsStore.selectEmployee()
    // this.props.contactsStore.employee = (e.target.value)
  };

  handleHistory = (employee, department) => {
    this.props.history.push({
      pathname: `/content/telefonnyi-spravochnik/`,
      search: `?${employee}${department}`
    });
  };

  clearTextField = () => {
    this.props.contactsStore.setEmploee("");
    this.handleHistory(
      ``,
      `&department=${this.props.contactsStore.department}`
    );
    this.props.contactsStore.selectEmployee();
    this.props.contactsStore.getStuff();
  };

  render() {
    const isHeader = level => {
      return level === 1;
    };

    const {
      departmentsForSelect,
      staffForSelect,
      department,
      staff,
      loading,
      employee
    } = this.props.contactsStore;

    const colourStyles = {
      option: (styles, { data }) => {
        return {
          ...styles,
          paddingLeft: `${data.level > 2 ? (data.level - 1) * 25 : 10}px`,
          // pointerEvents: isHeader(data.level) ? 'none' : '',
          textAlign: isHeader(data.level) ? "center" : ""
        };
      }
    };

    return (
      <DocumentTitle title="Телефонный справочник">
        <section className="phonebook section-wrapper">
          <PageTitleNavBlock data={this.props.contactsStore.contactsNav} />
          <form className="row mb-4">
            <div className="col-6">
              {departmentsForSelect.length > 0 && (
                <Select
                  styles={colourStyles}
                  isClearable
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={departmentsForSelect}
                  defaultValue={departmentsForSelect[0]}
                  onChange={this.onDepartmentChange}
                  isSearchable={true}
                  value={departmentsForSelect.filter(el => {
                    return el.value === department;
                  })}
                />
              )}
            </div>
            <div className="col-5">
              {/* <div style={this.state.onShow}> */}
              {staffForSelect.length >= 0 && (
                <Select
                  styles={colourStyles}
                  isClearable
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={staffForSelect}
                  placeholder="Поиск по фамилии, имени или ip-телефону"
                  components={{ DropdownIndicator: () => null }}
                //   components={{ Option: option }}
                  noOptionsMessage={() => "Сотрудники не найдены"}
                  // openOnFocus={false}
                  // openOnClick={false}
                  // menuIsOpen={this.state.onShow}
                  arrowRenderer={null}
                  onChange={this.onQueryChange}
                  isSearchable={true}
                  value={staffForSelect.filter(el => {
                    return (
                        el.value === employee)
                  })}
                />
              )}
              {/* </div> */}
              {/* <input
                            type='text'
                            className='phonebook__search-input mb-3'
                            placeholder='Поиск по фамилии, имени или ip-телефону'
                            onChange={this.onQueryChange}
                            value={employee}
                        /> */}
              {/* <span className='phonebook__search-input-clear' onClick={this.clearTextField}>
                            {SmallCross('#767676')}
                        </span> */}
            </div>
            <div className="col-1">
              <button
                type="submit"
                onClick={this.submitQuery}
                className="btn-blue btn-blue_lighter"
              >
                НАЙТИ
              </button>
            </div>
          </form>
          <div className="phonebook__content">
            <div className="row phonebook__row position-relative">
              {loading && (
                <div
                  className="spinner spinner_abs-middle"
                  style={{ marginTop: "100px" }}
                />
              )}
              {this.notFound() && !loading && (
                <div className="text-center w-100">Ничего не найдено</div>
              )}
              {staff &&
                !loading &&
                staff.map((el, i) => (
                  <div key={i} className="col-3 phonebook__col">
                    <EmployeeCard
                      thumb_urls={
                        el.thumb_urls.avatar ? el.thumb_urls.avatar.thumb : ""
                      }
                      surname={el.surname}
                      name={el.name}
                      patronymic={el.patronymic}
                      position={el.position}
                      office={el.office}
                      work_phone={el.work_phone}
                      personal_phone={el.office_phone}
                      mobile_phone={el.mobile_phone}
                      email={el.email}
                      department={el.department}
                      deparnmets_list={departmentsForSelect}
                      handleDepartmentLink={this.handleDepartmentLink}
                    />
                  </div>
                ))}
            </div>
          </div>
        </section>
      </DocumentTitle>
    );
  }
}

const option = (props: OptionProps<any>) => {
  return (
    // console.log(props.innerProps),
    <div 
    style={{
        backgroundColor: 'transparent',
        color: 'inherit',
        cursor: 'default',
        display: 'block',
        fontSize: 'inherit',
        padding: '8px 12px',
        width: '100%',
        userSelect: 'none',
        boxSizing: 'border-box',
        paddingLeft: '10px'
    }} {...props.innerProps}>
      {props.value}
    </div>
  );
};

export default PhoneBook;

import React, { Component } from 'react';
import TodoItem from './Todoitem';
import Modal from 'react-responsive-modal';
import { connect } from 'react-redux';
import Completeitem from './Completeitem';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      Iscompleted: false,
      IsCheckAll: false
    };
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  componentWillMount() {
    const data = JSON.parse(localStorage.getItem('Session_todo'));
    if (data) {
      this.props.dispatch({
        type: "GET_DATA",
        data: data
      });
    }
  }

  onCloseModal() {
    this.setState({ open: false });
  }

  onOpenModal() {
    this.setState({ open: true });
  }

  AddItem = (event) => {
    event.preventDefault();
    const title = this.getTitle.value;
    const des = this.getDes.value;
    const date = this.getDate.value;
    const time = this.getTime.value;
    const done = false

    const Newitem = {
      id: Date.now(),
      title,
      des,
      date,
      time,
      done
    }
    this.props.dispatch({
      type: "ADD_TODO",
      data: Newitem
    });
    this.onCloseModal();
  }

  IsClicked = () => {
    if (this.state.Iscompleted === true) {
      this.setState({ Iscompleted: false });
    } else {
      this.setState({ Iscompleted: true });
    }
  }

  IsCheckAll = () => {
    if (this.state.IsCheckAll === false) {
      this.setState({ IsCheckAll: true });
      this.props.dispatch({
        type: "UPDATE_CHECKALL",
      });
    } else {
      this.setState({ IsCheckAll: false });
      this.props.dispatch({
        type: "UPDATE_UNCHECKALL",
      });
    }
  }

  onItemChecked = (IsCheckitems) => {
    if (IsCheckitems === true) {
      this.setState({ IsCheckAll: false });
    }
  }

  componentDidUpdate() {
    this.props.dispatch({ type: "SET_DATA" });
  }

  render() {
    const { open } = this.state;
    const complete = this.props.items.filter(item => item.done === true).length;
    return (
      <div>
        <div className="col-md-8 col-md-offset-2" style={{ marginBottom: "20px" }}>
          <div className="row">
            <div className="col-md-offset-2 col-md-3 count_todocomplete"><a onClick={this.IsClicked} id="text_todo" title="Click for view completed task">{this.state.Iscompleted === true ? <strong>Back</strong> : <strong>{complete >= 0 ? complete : 0} Completed</strong>}</a></div>
            <div className="col-md-5" align="right">
              <button onClick={this.onOpenModal} className="btn"><i className="fa fa-lg fa-plus"></i></button>
            </div>
          </div>
          <div className="row dataContent">
            {this.state.Iscompleted === true ?
              <Completeitem onItemChecked={this.onItemChecked} /> : <TodoItem onItemChecked={this.onItemChecked} />}
          </div>
          <div className="col-md-offset-2 col-md-2 nopaddingleft-right width_checkall">
            <input type="checkbox" className="form-check-input_main" onClick={this.IsCheckAll} ref={(input) => this.getCheckall = input} checked={this.state.IsCheckAll === true} />
            <span className="checkall">Check all</span>
          </div>
        </div>
        <Modal open={open} onClose={this.onCloseModal}>
          <form className="submit_addtodo" onSubmit={this.AddItem}>
            <div className="modal-header">
              <h4 className="modal-title">Add New Todo</h4>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="user">Title:</label>
                <input type="text" className="form-control" ref={(input) => this.getTitle = input} placeholder="Please input Title" required />
              </div>
              <div className="form-group">
                <label htmlFor="des">Description:</label>
                <textarea className="form-control" ref={(input) => this.getDes = input} placeholder="Please input Description"></textarea>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input type="date" className="form-control" ref={(input) => this.getDate = input} required />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="date">Time:</label>
                    <input type="text" className="form-control" ref={(input) => this.getTime = input} placeholder="00:00" required />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary">Add</button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    items: state
  }
}

export default connect(mapStatetoProps)(TodoList);
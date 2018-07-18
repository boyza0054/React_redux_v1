import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import moment from 'moment';
import { connect } from 'react-redux';

class Item extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      Isclick:false
    };

    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }
  onCloseModal() {
    this.setState({ open: false });
  }

  onOpenModal() {
    this.setState({ open: true });
  }

  deleteItem = () => {
    if (window.confirm('Are you sure you want to delete ?')) {
      this.props.dispatch({
        type: "DELETE_TODO",
        id: this.props.id
      });
    }
  }

  UpdateItem = (event) => {
    event.preventDefault();
    const title = this.getTitle.value;
    const des = this.getDes.value;
    const date = this.getDate.value;
    const time = this.getTime.value;

    const Updateitem = {
      id: Date.now(),
      title,
      des,
      date,
      time
    }

    this.props.dispatch({
      type: "UPDATE_TODO",
      data: Updateitem,
      id: this.props.id
    });

    this.onCloseModal();
  }

  Updatecheckbox = () => {
    this.props.onItemChecked(true);
    this.props.dispatch({
      type: "UPDATE_COMPLETE_TASK",
      id: this.props.id
    });
  }

  UpdateTitleItem = (event) =>{
    event.preventDefault();
    this.props.dispatch({
      type: "UPDATE_TITLE_TODO",
      title: this.getTitlename.value,
      id: this.props.id
    });
    this.CancleItem();
  }

  handinfo = () => {
    this.setState({Isclick:true});
  }

  CancleItem = () => {
    this.setState({Isclick:false});
  }

  render() {
    var itemClass = "row form-check todoitem " + (this.props.done ? "done" : "undone");
    const today = moment().format("DD/MM/YYYY");
    const duedate = moment(this.props.date).format("DD/MM/YYYY");
    const time = this.props.time === null ? "00:00" : this.props.time;
    const { open } = this.state;
    return (
      <div id="box" className={itemClass} ref={li => this._listItem = li}>
        <div className="col-md-1">
          <input type="checkbox" className="form-check-input" onChange={this.Updatecheckbox} checked={this.props.done} />
        </div>
        <div className="col-md-9" align="left">
          {this.state.Isclick === true ?
            <form className="row" onSubmit={this.UpdateTitleItem}>
              <div className="col-md-8">
                <input type="text" className="form-control" ref={(input) => this.getTitlename = input} defaultValue={this.props.title} placeholder="Please input Title" />
              </div>
              <div className="col-md-4 btn-box">
                <button className="btn btn-primary">
                  <i className='fa fa-check-circle-o' aria-hidden='true'></i>
                </button>
                <a onClick={this.CancleItem} className="btn btn-danger btn-paddingleft">
                  <i className="fa fa-times-circle" aria-hidden="true"></i>
                </a>
              </div>
            </form>
            : <label className="form-check-label"><a onClick={this.handinfo} id="text_todo">{this.props.title}</a> <div className="duedate">{today === duedate ? "Today " + time : duedate}</div></label>}
        </div>
        <div className="col-md-1 nopaddingleft-right">
          <button type="button" className="btn btn-success btn-sm" onClick={this.onOpenModal}>
            <i className="fa fa-pencil-square-o"></i>
          </button>
        </div>
        <div className="col-md-1 nopaddingleft-right" style={{ width: "35px" }}>
          <button type="button" className="btn btn-danger btn-sm" onClick={this.deleteItem}>
            <i className="fa fa-trash-o" aria-hidden="true"></i>
          </button>
        </div>
        <Modal open={open} onClose={this.onCloseModal}>
          <form className="submit_addtodo" onSubmit={this.UpdateItem}>
            <div className="modal-header">
              <h4 className="modal-title">Update Todo</h4>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="user">Title:</label>
                <input type="text" className="form-control" ref={(input) => this.getTitle = input} defaultValue={this.props.title} placeholder="Please input Title" />
              </div>
              <div className="form-group">
                <label htmlFor="des">Description:</label>
                <textarea className="form-control" ref={(input) => this.getDes = input} defaultValue={this.props.des}></textarea>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input type="date" className="form-control" ref={(input) => this.getDate = input} defaultValue={this.props.date} required />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="date">Time:</label>
                    <input type="text" className="form-control" ref={(input) => this.getTime = input} defaultValue={this.props.time} placeholder="00:00" />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" disabled={!this.props.title}>Update</button>
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

export default connect(mapStatetoProps)(Item);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Item from './Item';
// step 1 import react-redux for connect store
class TodoItem extends Component {
  render() {
    return (
      <div className="col-md-8 col-md-offset-2">
        {this.props.items.length === 0 ?
          <div className="todolist nodata">No data available in completed tasks.</div>
          : <div className="todolist">
            {this.props.items.map(item => (
              <Item key={item.id} id={item.id} title={item.title} des={item.des} date={item.date} time={item.time} done={item.done} onItemChecked={this.props.onItemChecked} />
            ))}
          </div>
        }
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    items: state
  }
}

export default connect(mapStatetoProps)(TodoItem);
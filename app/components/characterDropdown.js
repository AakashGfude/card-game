import React, { Component } from 'react';
import { connect } from 'react-redux';
class characterDropdown extends Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(newProps) {
    if(newProps.fetchMarvel.data.length) {
      this.refs.select.classList.remove('is-loading');
    }
  }
  render() {
    const { input, meta } = this.props;
    return (
      <div className="field">
        <div className="control is-expanded">
          <div ref="select" className="select is-fullwidth is-loading">
            <select {...input}>
              <option disabled value="">Select a Character</option>
              {
                this.props.fetchMarvel && this.props.fetchMarvel.data && this.props.fetchMarvel.data.map((data) => {
                  return (
                    <option key={data.id} value={data.name}>{data.name}
                    </option>
                  )
              })
            }
            </select>
          </div>
        </div>
        <p className="help is-danger">{meta.touched ? meta.error : ''}</p>
      </div>
    )
  }
}

function mapStatetoProps(state) {
  return {
    fetchMarvel: state.fetchMarvel
  }
}

export default connect(mapStatetoProps)(characterDropdown)

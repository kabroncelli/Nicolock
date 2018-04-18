import React from 'react'
import PropTypes from 'prop-types'
import helpers from '../utils/helpers'
import Cookies from 'universal-cookie'

import Contractors from './Contractors'

class ContractorList extends React.Component {
  static propTypes = {
    editable: PropTypes.bool.isRequired,
  }

  constructor (props) {
    super(props)
    this.state = {
      contractorList: [],
    }
    if (props.editable) {
      const cookies = new Cookies()
      this.csrfToken = cookies.get('csrftoken')
    }
  }

  componentDidMount () {
    const contractors = helpers.getContractors()
    contractors
      .then((contractorList) => {
        this.setState({
          contractorList: contractorList.contractor_list,
        })
      })
  }

  removeContractor = (contractorId) => {
    if (this.state.contractorList.length > 0) {
      const contractorIds = this.state.contractorList.map(contractor => contractor.id)
      const contractors = helpers.removeContractor(this.csrfToken, contractorId, contractorIds)
      contractors
        .then((contractorList) => {
          this.setState({
            contractorList: contractorList.contractor_list,
          })
        })
    }
  }

  render () {
    return (
      <Contractors
        contractorList={this.state.contractorList}
        removeContractor={this.props.editable ? this.removeContractor : undefined} />
    )
  }
}

export default ContractorList

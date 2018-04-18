import axios from 'axios'

const contractorList = {

  getContractors () {
    return axios.get(`/rest/contractor-list/`)
      .then((data) => {
        return data.data
      })
      .catch((error) => {
        return error.response.data
      })
  },

  removeContractor (csrfToken, contractorId, currentContractorIds) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
    }
    const newContractorIds = currentContractorIds.filter(id => id !== contractorId)
    return axios.patch(`/rest/contractor-list/`, {
      'contractors': newContractorIds,
    }, config)
      .then((data) => {
        return data.data
      })
      .catch((error) => {
        return error.response.data
      })
  },

  saveCompanyProfile (csrfToken, field, value) {
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
    }
    return axios.patch('/rest/users/me/company-profile', {
      [field]: value,
    }, config)
      .catch((error) => {
        return error.response.data
      })
  },

}

export default contractorList

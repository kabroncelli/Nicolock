import React from 'react'
import PropTypes from 'prop-types'
import Cookies from 'universal-cookie'
import helpers from '../utils/helpers'

class ContractorProfile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: props.name,
      address_line_1: props.address_line_1,
      address_line_2: props.address_line_2,
      city: props.city,
      state: props.state,
      postal_code: props.postal_code,
      website: props.website,
      phone: props.phone,
      email: props.email,
      contact: props.contact,
      area: props.area,
      specialties: props.specialties,
      description: props.description,
      editable: props.editable,
      message: '',
      messageVisible: false,
    }
    let cookies = new Cookies()
    this.csrfToken = cookies.get('csrftoken')

    this.handleAddressLine1 = this.updateField.bind(this, 'address_line_1')
    this.handleAddressLine2 = this.updateField.bind(this, 'address_line_2')
    this.handleCity = this.updateField.bind(this, 'city')
    this.handleState = this.updateField.bind(this, 'state')
    this.handlePostalCode = this.updateField.bind(this, 'postal_code')
    this.handleWebsite = this.updateField.bind(this, 'website')
    this.handlePhone = this.updateField.bind(this, 'phone')
    this.handleEmail = this.updateField.bind(this, 'email')
    this.handleContact = this.updateField.bind(this, 'contact')
    this.handleArea = this.updateField.bind(this, 'area')
    this.handleSpecialties = this.updateField.bind(this, 'specialties')
    this.handleDescription = this.updateField.bind(this, 'description')
    this.saveProfileField = this.saveProfileField.bind(this)
  }

  updateField (field, event) {
    this.setState({
      [field]: event.target.value,
    })
  }

  saveProfileField (event) {
    let updatedField = helpers.saveCompanyProfile(this.csrfToken, event.target.name, event.target.value)
    updatedField
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            message: 'Your profile has been saved',
            messageVisible: true,
          })
          setTimeout(() => {
            this.setState({
              messageVisible: false,
            })
          }, 2000)
        } else {
          this.setState({
            message: 'There was a problem saving your profile',
            messageVisible: true,
          })
          setTimeout(() => {
            this.setState({
              messageVisible: false,
            })
          }, 2000)
        }
      })
  }

  render () {
    return (
      <form className='companyprofile-form'>
        <div className='input-group address-group'>
          <label className='label'>Address:</label>
          <div>
            <input className={'input ' + (this.props.editable ? 'has-icon' : '')} disabled={!this.props.editable} name='address_line_1' value={this.state.address_line_1} onChange={this.handleAddressLine1} onBlur={this.saveProfileField} />
            <input className={'input ' + (this.props.editable ? 'has-icon' : '')} disabled={!this.props.editable} name='address_line_2' value={this.state.address_line_2} onChange={this.handleAddressLine2} onBlur={this.saveProfileField} />
            <div className='state-data'>
              <input className={'input ' + (this.props.editable ? 'has-icon' : '')} disabled={!this.props.editable} name='city' value={this.state.city} onChange={this.handleCity} onBlur={this.saveProfileField} />
              <input className={'input ' + (this.props.editable ? 'has-icon' : '')} disabled={!this.props.editable} name='state' value={this.state.state} onChange={this.handleState} onBlur={this.saveProfileField} />
              <input className={'input ' + (this.props.editable ? 'has-icon' : '')} disabled={!this.props.editable} name='postal_code' value={this.state.postal_code} onChange={this.handlePostalCode} onBlur={this.saveProfileField} />
            </div>
          </div>
        </div>
        <div className='input-group'>
          <label className='label'>Website:</label>
          <input className={'input ' + (this.props.editable ? 'has-icon' : '')} disabled={!this.props.editable} name='website' value={this.state.website} onChange={this.handleWebsite} onBlur={this.saveProfileField} />
        </div>
        <div className='input-group'>
          <label className='label'>Phone:</label>
          <input className={'input ' + (this.props.editable ? 'has-icon' : '')} disabled={!this.props.editable} name='phone' value={this.state.phone} onChange={this.handlePhone} onBlur={this.saveProfileField} />
        </div>
        <div className='input-group'>
          <label className='label'>Email:</label>
          <input className={'input ' + (this.props.editable ? 'has-icon' : '')} disabled={!this.props.editable} name='email' value={this.state.email} onChange={this.handleEmail} onBlur={this.saveProfileField} />
        </div>
        <div className='input-group'>
          <label className='label'>Contact Person:</label>
          <input className={'input ' + (this.props.editable ? 'has-icon' : '')} disabled={!this.props.editable} name='contact_name' value={this.state.contact} onChange={this.handleContact} onBlur={this.saveProfileField} />
        </div>
        <div className='input-group'>
          <label className='label'>Areas Covered:</label>
          <input className={'input ' + (this.props.editable ? 'has-icon' : '')} disabled={!this.props.editable} name='area_covered' value={this.state.area} onChange={this.handleArea} onBlur={this.saveProfileField} />
        </div>
        <div className='input-group'>
          <label className='label'>Specialties:</label>
          <input className={'input ' + (this.props.editable ? 'has-icon' : '')} disabled={!this.props.editable} name='specialties' value={this.state.specialties} onChange={this.handleSpecialties} onBlur={this.saveProfileField} />
        </div>
        <div className='input-group'>
          <label className='label'>Description:</label>
          <input className={'input ' + (this.props.editable ? 'has-icon' : '')} disabled={!this.props.editable} name='description' value={this.state.description} onChange={this.handleDescription} onBlur={this.saveProfileField} />
        </div>
        <p className={'message ' + (this.state.messageVisible ? 'is-visible' : '')}>{this.state.message}</p>
      </form>
    )
  }
};

ContractorProfile.propTypes = {
  name: PropTypes.string.isRequired,
  address_line_1: PropTypes.string.isRequired,
  address_line_2: PropTypes.string,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  postal_code: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  contact: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  specialties: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  editable: PropTypes.bool.isRequired,
}

export default ContractorProfile

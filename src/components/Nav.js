import React, { Component } from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class Nav extends Component{

  state = {
    value: 0,
  }

  a11yProps = (index) => {
    return {
      id: `nav-tab-${index}`,
      'aria-controls': `nav-tabpanel-${index}`,
    };
  }

  handleChange = (e, newValue) => {
    e.preventDefault()
    if(this.checkAuth()) {
      this.setState({
        value: newValue
      })
      switch (newValue) {
        case 0:
          this.props.history.push('/')
          break
        case 1:
          this.props.history.push('/add')
          break
        case 2:
          this.props.history.push('/leaderboard')
          break
        default:
          this.props.history.push('/')
      }
    }
  }

  checkAuth() {
    const { authedUser } = this.props
    if (!authedUser) {
      this.props.history.push('/login')
      return false
    } else {
      return true
    }
  }

  componentDidMount() {
    this.checkAuth()
    const pathname = this.props.history.location.pathname
    switch (pathname) {
      case '/':
        this.setState({value: 0})
        break
      case '/add':
        this.setState({value: 1})
        break
      case '/leaderboard':
        this.setState({value: 2})
        break
      default:
        this.setState({value: 0})
    }
  }

  render() {
    const { value }= this.state
    return(
      <Tabs value={value} onChange={this.handleChange}>
        <Tab label="Home" {...this.a11yProps(0)}/>
        <Tab label="New Question" {...this.a11yProps(1)}/>
        <Tab label="Leader Board" {...this.a11yProps(2)}/>
      </Tabs>
    )
  }
}
function mapStateToProps ({ authedUser }) {
  return {
    authedUser
  }
}
export default withRouter(connect(mapStateToProps)(Nav))
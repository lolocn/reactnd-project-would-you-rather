import React, { Fragment, Component}  from 'react'
import { ListItem, ListItemAvatar, ListItemText, Avatar, Typography, Divider } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
class Question extends Component {

    handleClick = (e) => {
        e.preventDefault()
        const { question, history } = this.props
        history.push(`/questions/${question.id}`)
    }

    render() {
        const { question, user } = this.props
        return (
            <Fragment>
                <ListItem button onClick={this.handleClick} alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt={user.name} src={user.avatarURL} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={`${user.name} asks`}
                        secondary={
                            <Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    color="textPrimary"
                                >
                                    Would you rather &nbsp;
                                </Typography>
                                {question.optionOne.text}
                            </Fragment>
                        }
                        />
                </ListItem>
                <Divider />
            </Fragment>
        )
    }
}


export default withRouter(Question)
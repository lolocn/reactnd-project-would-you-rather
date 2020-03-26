import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { 
    List, 
    ListItem, 
    ListItemAvatar, 
    ListItemText, 
    Divider, 
    Avatar,
    Typography 
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
class LeaderBoard extends Component {

    sortUsers(users) {
        if (users) {
            const userIds = Object.keys(users)
            let leaderList = []
            userIds.forEach(id => {
                let user = {}
                user.id = id
                user.numQuestions = users[id].questions.length
                user.numAnswers = Object.keys(users[id].answers).length
                user.score = user.numAnswers + user.numQuestions
                leaderList.push(user)
            })
            leaderList.sort((a, b) => b.score - a.score)
            return leaderList
        }
    }

    render() {
        const { users, classes } = this.props
        const leaderList = this.sortUsers(users)
        return(
            <List className={classes.root}>
                {
                    leaderList.map((leader, index) => {
                        return (
                            <Fragment key={leader.id}>
                                <ListItem alignItems="flex-start" button>
                                    <ListItemAvatar>
                                        <Avatar alt={users[leader.id].name} src={users[leader.id].avatarURL} />
                                    </ListItemAvatar>
                                    <ListItemText primary={users[leader.id].name} 
                                        secondary={
                                            <Fragment>
                                                <Typography component="span">Answered Questions {leader.numAnswers}</Typography><br/>
                                                <Typography component="span">Created Questions {leader.numQuestions}</Typography>
                                            </Fragment>
                                        }>                                     
                                    </ListItemText>
                                    <div>
                                        <div className={classes.rank}>
                                            Rank: {index + 1}
                                        </div>
                                        <div className={classes.score}>
                                            Score: {leader.score}
                                        </div>
                                    </div>
                                </ListItem>
                                <Divider/>
                            </Fragment>
                            
                        )
                    })
                }
            </List>
        )
    }
}

function mapStateToProps ({ users }) {
  
    return {
        users,
    }
}

const style = theme => (
    {
        root: {
            flexGrow: 1,
        },
        rank: {
            fontSize: 20,
            margin: 10
        },
        score: {
            margin: 10,
        },
    }
)

export default connect(mapStateToProps)(withStyles(style)(LeaderBoard))
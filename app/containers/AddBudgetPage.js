import React from 'react';
import {Card, CardTitle, CardText, CardActions, RaisedButton, TextField} from 'material-ui'
import present from '../presenters/addAccountPagePresenter'
import { connect } from 'react-redux'
import merge from 'lodash/merge'
import {bindActionCreators} from 'redux'
import * as NavigationActions from '../actions/navigation'
import * as BudgetActions from '../actions/budget'

import present from '../presenters/addBudgetPagePresenter'

@connect(()=>{}, mapDispatchToProps)
@present
export default class AddAccountPage extends React.Component {
  save(){
    let month = this.refs.month.getValue()
    let amount = this.refs.amount.getValue()
    this.props.addBudget({month, amount}, () => this.props.goBack())
  }
  render() {
    return (
      <Card>
        <CardTitle title='Add Budget'/>
        <CardText>
          <TextField fullWidth={true} id="month" ref="month" hintText="Month" floatingLabelText="Month" autoFocus />
          <TextField fullWidth={true} id="amount" ref="amount" hintText="amount" floatingLabelText="Amount" />
        </CardText>
        <CardActions>
          <RaisedButton
            label='Save'
            primary={true}
            onTouchTap={() => this.save()}/>
        </CardActions>
      </Card>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(merge({}, BudgetActions, NavigationActions), dispatch)
}

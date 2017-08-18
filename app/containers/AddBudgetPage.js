import React from 'react';
import {Card, CardTitle, CardText, CardActions, RaisedButton, TextField} from 'material-ui'

import present from '../presenters/addBudgetPagePresenter'

@present
export default class AddBudgetPage extends React.Component {
  save(){
    // console.log(this.props.test)
    let month = this.refs.month.getValue()
    let amount = this.refs.amount.getValue()
    this.props.addBudget({month, amount})
  }
  render() {
    return (
      <Card>
        <CardTitle title='Add Budget'/>
        <CardText>
          <TextField fullWidth={true} id="month" ref="month" hintText="Month" floatingLabelText="Month" autoFocus errorText={this.props.errorTextForMonth} />
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


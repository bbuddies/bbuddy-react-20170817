import { BudgetsPagePresenter} from '../../app/presenters/budgetsPagePresenter'

describe('BudgetPagePresenter', () => {
    context('Calc Total Amount', () => {
        let presenter
        beforeEach(() => {
          let props = {
              budgets: [
                { month: '2016-10', amount: 3100 },
                { month: '2016-11', amount: 3000 },
                { month: '2017-01', amount: 3100 },
              ]}
          presenter = new BudgetsPagePresenter(props)
        })
        it('budgets between 2016-09-01 and 2016-10-02 should be 200', () => {
            presenter.calcBudgets({startAt: '2016-09-01', endAt: '2016-10-02'}).should.be.equal(200)
        })
        it('budgets between 2016-10-01 and 2016-11-15 should be 4600', () => {
            presenter.calcBudgets({startAt: '2016-09-01', endAt: '2016-11-15'}).should.be.equal(4600)
        })
        it('budgets between 2017-02-01 and 2017-11-15 should be 0', () => {
            presenter.calcBudgets({startAt: '2017-02-01', endAt: '2017-11-15'}).should.be.equal(0)
        })
    })
})

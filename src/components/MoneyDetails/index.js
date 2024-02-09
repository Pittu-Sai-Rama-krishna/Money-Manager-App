// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {moneyDetails} = props
  const {totalBalance, totalIncom, totalExpenses} = moneyDetails

  return (
    <>
      <div className="total-container balance">
        <img
          className="total-image"
          alt="balance"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
        />
        <div className="total-text-container">
          <p className="total-text-description">Your Balance</p>
          <p className="total-text-amount" data-testid="balanceAmount">
            RS {totalBalance}
          </p>
        </div>
      </div>
      <div className="total-container income">
        <img
          className="total-image"
          alt="income"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
        />
        <div className="total-text-container">
          <p className="total-text-description">Your Income</p>
          <p className="total-text-amount" data-testid="incomeAmount">
            RS {totalIncom}
          </p>
        </div>
      </div>
      <div className="total-container expenses">
        <img
          className="total-image"
          alt="expenses"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
        />
        <div className="total-text-container">
          <p className="total-text-description">Your Expenses</p>
          <p className="total-text-amount" data-testid="expensesAmount">
            RS {totalExpenses}
          </p>
        </div>
      </div>
    </>
  )
}

export default MoneyDetails

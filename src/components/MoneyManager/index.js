import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    moneyDetails: {totalBalance: 0, totalIncom: 0, totalExpenses: 0},
    transactionHistoryList: [],
    titleInput: '',
    amountInput: '',
    optionId: 'INCOME',
    displayText: 'Income',
  }

  getTransactionItem() {
    const {titleInput, amountInput, optionId} = this.state
    return {
      transactionId: uuidv4(),
      transactionTitle: titleInput,
      transactionAmount: parseInt(amountInput),
      transactionOptionId: optionId,
      transactionDisplayText: optionId === 'INCOME' ? 'Income' : 'Expenses',
    }
  }

  getMoneyDetails() {
    const {amountInput, optionId, moneyDetails} = this.state
    console.log(this.state)
    const {totalIncom, totalExpenses} = moneyDetails
    let updatedTotalIncom
    let updatedTotalExpences
    if (optionId === 'INCOME') {
      updatedTotalIncom = parseInt(totalIncom) + parseInt(amountInput)
      updatedTotalExpences = parseInt(totalExpenses)
    } else {
      updatedTotalExpences = parseInt(totalExpenses) + parseInt(amountInput)
      updatedTotalIncom = parseInt(totalIncom)
    }
    const updatedTotalBalance =
      parseInt(updatedTotalIncom) - parseInt(updatedTotalExpences)

    return {
      totalBalance: updatedTotalBalance,
      totalExpenses: updatedTotalExpences,
      totalIncom: updatedTotalIncom,
    }
  }

  addTransaction = event => {
    event.preventDefault()

    const newTransactionItem = this.getTransactionItem()
    const updatedMoneyDetails = this.getMoneyDetails()
    console.log(newTransactionItem)
    console.log(updatedMoneyDetails)
    this.setState(prevState => ({
      moneyDetails: updatedMoneyDetails,
      transactionHistoryList: [
        ...prevState.transactionHistoryList,
        newTransactionItem,
      ],
      titleInput: '',
      amountInput: '',
      optionId: '',
    }))
  }

  titleInputChange = event => {
    this.setState({titleInput: event.target.value})
  }

  amountInputChange = event => {
    this.setState({amountInput: event.target.value})
  }

  selectInputChange = event => {
    this.setState({optionId: event.target.value})
  }

  onDeleteTransaction = id => {
    const {moneyDetails, transactionHistoryList} = this.state
    const {totalIncom, totalExpenses} = moneyDetails
    let deletedItem
    const filteredTransactionHistoryList = transactionHistoryList.filter(
      eachItem => {
        if (id !== eachItem.transactionId) {
          return true
        }
        deletedItem = eachItem
        return false
      },
    )
    const {transactionAmount, transactionOptionId} = deletedItem
    let updatedTotalIncom
    let updatedTotalExpences
    if (transactionOptionId === 'INCOME') {
      updatedTotalIncom = parseInt(totalIncom) - parseInt(transactionAmount)
      updatedTotalExpences = parseInt(totalExpenses)
    } else {
      updatedTotalExpences =
        parseInt(totalExpenses) - parseInt(transactionAmount)
      updatedTotalIncom = parseInt(totalIncom)
    }
    const updatedTotalBalance =
      parseInt(updatedTotalIncom) - parseInt(updatedTotalExpences)

    const updatedMoneyDetails = {
      totalBalance: updatedTotalBalance,
      totalExpenses: updatedTotalExpences,
      totalIncom: updatedTotalIncom,
    }
    this.setState({
      moneyDetails: updatedMoneyDetails,
      transactionHistoryList: [...filteredTransactionHistoryList],
    })
  }

  render() {
    console.log(this.state)
    const {
      titleInput,
      amountInput,
      transactionHistoryList,
      moneyDetails,
      // eslint-disable-next-line
      optionId,
    } = this.state
    return (
      <div className="money-manager-container">
        <div className="user-container">
          <h1 className="user-name">Hi, Sai</h1>
          <p className="user-greeting">
            Welcome back to your{' '}
            <span className="user-greeting-span">Money Manager</span>
          </p>
        </div>
        <div className="money-details-container">
          <MoneyDetails moneyDetails={moneyDetails} />
        </div>
        <div className="transactions-and-history-container">
          <form
            className="transactions-container"
            onSubmit={this.addTransaction}
          >
            <h1 className="transactions-heading">Add Transaction</h1>
            <label htmlFor="titleInput" className="transactions-input-label">
              TITLE
            </label>
            <input
              type="text"
              className="transactions-input-text"
              placeholder="TITLE"
              onChange={this.titleInputChange}
              id="titleInput"
              value={titleInput}
            />
            <label htmlFor="amountInput" className="transactions-input-label">
              AMOUNT
            </label>
            <input
              type="text"
              className="transactions-input-text"
              placeholder="AMOUNT"
              onChange={this.amountInputChange}
              id="amountInput"
              value={amountInput}
            />
            <label htmlFor="selectInput" className="transactions-input-label">
              TYPE
            </label>
            <select
              className="transactions-input-select"
              onChange={this.selectInputChange}
              id="selectInput"
            >
              {transactionTypeOptions.map(eachItem => (
                <option
                  className="transactions-input-select-option"
                  value={eachItem.optionId}
                  key={eachItem.optionId}
                >
                  {eachItem.displayText}
                </option>
              ))}
            </select>
            <button type="submit" className="transactions-submit-button">
              Add
            </button>
          </form>
          <div className="transactions-history-container">
            <h1 className="transactions-history-heading">History</h1>
            <ul className="transactions-history-list-container">
              <li className="transactions-history-list-main-row">
                <p className="transactions-history-list-main-row-title">
                  Title
                </p>
                <p className="transactions-history-list-main-row-amount">
                  Amount
                </p>
                <p className="transactions-history-list-main-row-type">Type</p>
              </li>
              {transactionHistoryList.map(eachItem => (
                <TransactionItem
                  transactionItemDetails={eachItem}
                  onDelete={this.onDeleteTransaction}
                  key={eachItem.transactionId}
                />
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-section footer-mobile ">
          <div className="footer-info m-auto ">
            <p>
              Developed with <span className="heart-beat "> ❤️ </span> by Sai
              Rama Krishna{' '}
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager

// Write your code here
import './index.css'

const TransactionItem = props => {
  const {transactionItemDetails, onDelete} = props
  const {
    transactionId,
    transactionTitle,
    transactionAmount,
    transactionDisplayText,
  } = transactionItemDetails

  return (
    <li className="transaction-item-container" key={transactionId}>
      <p className="transaction-item-title">{transactionTitle}</p>
      <p className="transaction-item-amount">Rs {transactionAmount}</p>
      <p className="transaction-item-type">{transactionDisplayText}</p>
      <button
        type="button"
        className="transaction-item-button"
        data-testid="delete"
        onClick={() => onDelete(transactionId)}
      >
        <img
          className="transaction-item-image"
          alt="delete"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
        />
      </button>
    </li>
  )
}

export default TransactionItem

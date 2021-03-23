import React, {useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);

  const sign = transaction.price < 0 ? '-' : '+';

  return (
    <li className={transaction.price < 0 ? 'minus' : 'plus'}>
      {transaction.name} <span>{sign}${Math.abs(transaction.price)}</span><button onClick={() => deleteTransaction(transaction._id)} className="delete-btn">x</button>
    </li>
  )
}

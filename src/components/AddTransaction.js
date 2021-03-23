import React, {useState, useContext} from 'react'
import { GlobalContext } from '../context/GlobalState';

export const AddTransaction = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = e => {
    e.preventDefault();

    const newTransaction = {
//       id: Math.floor(Math.random() * 100000000),
      name,
      price: +price,
      stock: '110'
    }

    addTransaction(newTransaction);
  }

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter  name..." />
        </div>
        <div className="form-control">
          <label htmlFor="price"
            >Price <br />
            (negative - expense, positive - income)</label
          >
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter price..." />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  )
}

import React, { useState } from 'react';
import './App.css';
import FormikLoginForm from "./components/Form";


function App() {

  const [users] = useState([])
  return (
    <div className="App">
      <FormikLoginForm />

      {users.map((user) => (
        <div className="output">
          <ul key={user.id}>
            <li>`Name: ${user.name}`</li>
            <li>`Email: ${user.email}`</li>
            <li>`Password: ${user.password}`</li>
            <li>`Gender: ${user.gender}`</li>
          </ul>
          <p>`Message: ${user.msg}`</p>
        </div>
      ))}
    </div>
  );
}
export default App;

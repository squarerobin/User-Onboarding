import React, { useState } from 'react';
import './App.css';
import FormikLoginForm from "./components/Form";


function App() {

  const [users, setUsers] = useState([])
  return (
    <div className="App">
      <FormikLoginForm />

      {users.map((data) => (
        <div className="output">
          <ul key={data.id}>
            <li>`Name: ${data.name}`</li>
            <li>`Email: ${data.email}`</li>
            <li>`Password: ${data.password}`</li>
            <li>`Gender: ${data.gender}`</li>
          </ul>
          <p>`Message: ${data.msg}`</p>
        </div>
      ))}
    </div>
  );
}
export default App;

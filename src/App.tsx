import React, { useState } from "react";
import { InputField } from "./components/InputField/InputField";
import { DataTable, Column } from "./components/DataTable/DataTable";

interface Person {
  id: number;
  name: string;
  age: number;
}

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const columns: Column<Person>[] = [
    { key: "id", title: "ID", dataIndex: "id", sortable: true },
    { key: "name", title: "Name", dataIndex: "name", sortable: true },
    { key: "age", title: "Age", dataIndex: "age", sortable: true },
  ];

  const data: Person[] = [
    { id: 1, name: "Alice", age: 24 },
    { id: 2, name: "Bob", age: 30 },
    { id: 3, name: "Charlie", age: 22 },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* ✅ Username & Password Section */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Login Form</h1>
        <InputField
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={() => alert(`Username: ${username}, Password: ${password}`)}
        >
          Login
        </button>
      </div>

      {/* ✅ DataTable Section */}
      <div>
        <h1 className="text-2xl font-bold mb-4">DataTable Example</h1>
        <DataTable<Person>
          data={data}
          columns={columns}
          loading={false}
          selectable={true}
          onRowSelect={(rows) => console.log("Selected rows:", rows)}
        />
      </div>
    </div>
  );
}

export default App;

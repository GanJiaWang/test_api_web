import React from "react";
import Login from "@components/Login";

const App: React.FC = ({ setAuth }: any) => {
    return <Login setAuth={setAuth} />;
};

export default App;

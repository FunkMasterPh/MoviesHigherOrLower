import Layout from "./components/Layout";
import React from "react";
import Helmet  from "react-helmet";

function App() {
    return (
        <>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Higher Or Lower - Movie Edition</title>
            <link rel="icon" type="image/png" href="logo.png" sizes="16x16" />
        </Helmet>
        <Layout></Layout>
        </>
    )
}

export default App;

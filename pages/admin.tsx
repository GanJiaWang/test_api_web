import Head from "next/head";
import { Layout } from "antd";
import Header from "@components/App/Header";
import Sidebar from "@components/App/Sidebar";
import Admin from "@components/Admin";
import React, { useState } from "react";

const Home: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <>
            <Head>
                <title>Next.JS</title>
            </Head>
            <Layout className="h-full">
                <Sidebar collapsed={collapsed} />
                <Layout className="site-layout">
                    <Header collapsed={collapsed} setCollapsed={setCollapsed} />
                    <Admin />
                </Layout>
            </Layout>
        </>
    );
};

export default Home;

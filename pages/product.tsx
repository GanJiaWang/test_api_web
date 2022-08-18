import Head from "next/head";
import { Layout } from "antd";
import Header from "@components/App/Header";
import Sidebar from "@components/App/Sidebar";
import Product from "@components/Product";
import React, { useState } from "react";

const Home: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <>
            <Head>
                <title>Next.JS</title>
            </Head>
            <Layout className="h-screen">
                <Sidebar collapsed={collapsed} />
                <Layout className="site-layout">
                    <Header collapsed={collapsed} setCollapsed={setCollapsed} />
                    <Product />
                </Layout>
            </Layout>
        </>
    );
};

export default Home;

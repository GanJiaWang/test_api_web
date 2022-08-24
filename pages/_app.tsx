import "../styles/globals.scss";
import "antd/dist/antd.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Layout } from "antd";
import Header from "@components/App/Header";
import Sidebar from "@components/App/Sidebar";
import React, { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
    const [collapsed, setCollapsed] = useState(false);
    const [sidebarKey, setSidebarKey] = useState("1");
    const [auth, setAuth] = useState(false);

    return auth ? (
        <>
            <Head>
                <title>Next.JS</title>
            </Head>
            <Layout className="h-full min-h-screen">
                <Sidebar
                    collapsed={collapsed}
                    sidebarKey={sidebarKey}
                    setSidebarKey={setSidebarKey}
                />
                <Layout className="site-layout">
                    <Header collapsed={collapsed} setCollapsed={setCollapsed} setAuth={setAuth} />
                    <Component {...pageProps} />
                </Layout>
            </Layout>
        </>
    ) : (
        <Component {...pageProps} setAuth={setAuth} />
    );
}

export default MyApp;

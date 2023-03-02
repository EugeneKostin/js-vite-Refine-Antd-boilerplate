import '@pankod/refine-antd/dist/reset.css'

import { AuthPage, ErrorComponent, notificationProvider, ReadyPage } from '@pankod/refine-antd'
import { Refine } from '@pankod/refine-core'
import routerProvider from '@pankod/refine-react-router-v6'
import dataProvider from '@pankod/refine-simple-rest'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { authProvider } from './authProvider'
import { Footer, Header, Layout, OffLayoutArea, Sider, Title } from './components/layout'
import { PostList } from './pages/posts'

function App() {
    const { t, i18n } = useTranslation()

    const i18nProvider = {
        translate: (key, params) => t(key, params),
        changeLocale: (lang) => i18n.changeLanguage(lang),
        getLocale: () => i18n.language,
    }

    return (
        <Refine
            dataProvider={dataProvider('https://api.fake-rest.refine.dev')}
            notificationProvider={notificationProvider}
            ReadyPage={ReadyPage}
            catchAll={<ErrorComponent />}
            resources={[
                {
                    name: 'posts',
                    list: PostList,
                },
            ]}
            Title={Title}
            Header={Header}
            Sider={Sider}
            Footer={Footer}
            Layout={Layout}
            OffLayoutArea={OffLayoutArea}
            routerProvider={routerProvider}
            authProvider={authProvider}
            LoginPage={AuthPage}
            i18nProvider={i18nProvider}
        />
    )
}

export default App

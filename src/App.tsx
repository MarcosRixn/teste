import { Login } from './Pages/Login'
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from "react-router-dom"
import { Router } from './Router'
import { NotificationsProvider } from '@mantine/notifications';


function App() {

  return (
    <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
      <NotificationsProvider position='top-right'>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </NotificationsProvider>
    </MantineProvider>
  )
}

export default App

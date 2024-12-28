import {BrowserRouter} from 'react-router-dom'
import {Routing} from "./Routing.tsx";
import { NotificationProvider} from "./componenets/Notification/NotificationProvider.tsx";

function App() {

    return (
      <BrowserRouter>
          <NotificationProvider>
             <Routing/>
          </NotificationProvider>
  </BrowserRouter>
  );
}
export default App

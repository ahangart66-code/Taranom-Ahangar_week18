import Contacts from "./components/Contacts";
import Header from "./components/Header";
import { ContactsProvider } from "./context/ContactsContext";

function App() {
  return (
    <ContactsProvider>
      <>
        <Header />
        <Contacts />
      </>
    </ContactsProvider>
  );
}

export default App;

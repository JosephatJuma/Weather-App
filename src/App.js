import { NavBar } from "./components/NavBar";
import { Home } from "./components/Home";
import { Flex } from "@mantine/core";

function App({ toggleColorScheme, theme }) {
  return (
    <div>
      <Flex>
        <NavBar />
        <Home toggleColorScheme={toggleColorScheme} theme={theme} />
      </Flex>
    </div>
  );
}

export default App;

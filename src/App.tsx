import BabylonWorkspace from "./BabylonWorkspace"
const env = import.meta.env.MODE

function App() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <h1>env: {env}</h1>
      <BabylonWorkspace />
    </div>
  )
}

export default App

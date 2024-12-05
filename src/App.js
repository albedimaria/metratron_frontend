import Experience from "./Experience";
import './style.css'
import {Canvas} from "@react-three/fiber";

function App() {
  return (
          <Canvas
              className={"canvas"}
              shadows={true}
              dpr={[1, 2]}
              flat
              gl={{
                  antialiasing: true,
              }}
              camera={{
                  fov: 75,
                  near: 0.1,
                  far: 200,
                  position: [0, 0, 50],
              }}
          >
              <ambientLight intensity={0.5} color={"red"} />
              <pointLight position={[10, 10, 10]} intensity={1.0} color={"pink"} />

              <Experience/>

          </Canvas>
  );
}

export default App;

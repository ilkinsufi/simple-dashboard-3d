import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { SceneObject } from "../schemas";

type Props = {
  objects: SceneObject[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
};

function getScale(size: string) {
  if (size === "small") return 0.5;
  if (size === "large") return 1.5;
  return 1;
}

function SceneContent({ objects, selectedId, onSelect }: Props) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1} />
      <OrbitControls makeDefault />

      <gridHelper args={[20, 20, "#444", "#222"]} position={[0, 0, 0]} />

      {objects.map((obj) => {
        const isSelected = selectedId === obj.id;
        const scale = getScale(obj.size);
        return (
          <mesh
            key={obj.id}
            position={[obj.position.x, obj.position.y, obj.position.z]}
            scale={scale}
            onClick={() => onSelect(isSelected ? null : obj.id)}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={obj.color}
              emissive={isSelected ? obj.color : "#000000"}
              emissiveIntensity={isSelected ? 0.3 : 0}
            />
          </mesh>
        );
      })}
    </>
  );
}

export function Scene3D(props: Props) {
  return (
    <div className="w-full h-full min-h-[300px] bg-base-300 overflow-hidden">
      <Canvas
        camera={{ position: [5, 5, 5], fov: 50 }}
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <SceneContent {...props} />
      </Canvas>
    </div>
  );
}

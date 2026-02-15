import { useRef, useState, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { SceneObject } from "../schemas";

type Props = {
  objects: SceneObject[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onCanvasDoubleClick?: (pos: { x: number; y: number; z: number }) => void;
  onObjectMove?: (id: string, pos: { x: number; y: number; z: number }) => void;
};

function getScale(size: string) {
  if (size === "small") return 0.5;
  if (size === "large") return 1.5;
  return 1;
}

function SceneContent({ objects, selectedId, onSelect, onCanvasDoubleClick, onObjectMove }: Props) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragTargetId = useRef<string | null>(null);
  const offsetX = useRef(0);
  const offsetZ = useRef(0);

  const { camera, gl } = useThree();
  const canvasEl = useRef<HTMLCanvasElement | null>(null);
  const plane = useRef<THREE.Plane | null>(null);
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  const intersectPoint = useRef(new THREE.Vector3());
  const objectsRef = useRef(objects);
  const onObjectMoveRef = useRef(onObjectMove);

  useEffect(() => {
    canvasEl.current = gl.domElement;
  }, [gl]);
  useEffect(() => {
    objectsRef.current = objects;
    onObjectMoveRef.current = onObjectMove;
  }, [objects, onObjectMove]);

  const pendingPos = useRef<{ id: string; x: number; y: number; z: number } | null>(null);
  const rafId = useRef<number | null>(null);

  if (plane.current === null) {
    plane.current = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  }

  function applyPendingMove() {
    rafId.current = null;
    const p = pendingPos.current;
    if (!p) return;
    pendingPos.current = null;
    onObjectMoveRef.current?.(p.id, { x: p.x, y: p.y, z: p.z });
  }

  function onPointerMove(e: PointerEvent) {
    if (!dragTargetId.current || !canvasEl.current) return;
    const obj = objectsRef.current.find((o) => o.id === dragTargetId.current);
    if (!obj) return;

    const rect = canvasEl.current.getBoundingClientRect();
    mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.current.setFromCamera(mouse.current, camera);
    plane.current!.constant = -obj.position.y;
    const hit = raycaster.current.ray.intersectPlane(plane.current!, intersectPoint.current);
    if (hit !== null) {
      pendingPos.current = {
        id: obj.id,
        x: intersectPoint.current.x + offsetX.current,
        y: obj.position.y,
        z: intersectPoint.current.z + offsetZ.current,
      };
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(applyPendingMove);
      }
    }
  }

  function onPointerUp() {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    pendingPos.current = null;
    const el = canvasEl.current;
    if (el) {
      if (dragTargetId.current) {
        dragTargetId.current = null;
        setIsDragging(false);
        el.style.cursor = "";
        el.releasePointerCapture(1);
      }
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
    }
  }

  function startDrag(id: string, grabPoint: THREE.Vector3) {
    const obj = objects.find((o) => o.id === id);
    const el = canvasEl.current;
    if (!obj || !onObjectMove || !el) return;
    dragTargetId.current = id;
    offsetX.current = obj.position.x - grabPoint.x;
    offsetZ.current = obj.position.z - grabPoint.z;
    setIsDragging(true);
    el.style.cursor = "grabbing";
    el.setPointerCapture(1);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
  }

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1} />
      <OrbitControls makeDefault enabled={!isDragging} />

      <gridHelper args={[20, 20, "#444", "#222"]} position={[0, 0, 0]} />

      <mesh
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        onDoubleClick={(e) => {
          e.stopPropagation();
          const pt = e.point;
          onCanvasDoubleClick?.({ x: pt.x, y: pt.y, z: pt.z });
        }}
      >
        <planeGeometry args={[50, 50]} />
        <meshBasicMaterial visible={false} />
      </mesh>

      {objects.map((obj) => {
        const isSelected = selectedId === obj.id;
        const isHover = hoveredId === obj.id;
        const scale = getScale(obj.size);
        const showHighlight = isSelected || isHover;

        return (
          <mesh
            key={obj.id}
            position={[obj.position.x, obj.position.y, obj.position.z]}
            scale={scale}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(isSelected ? null : obj.id);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredId(obj.id);
              if (!dragTargetId.current && canvasEl.current) canvasEl.current.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              setHoveredId(null);
              if (!dragTargetId.current && canvasEl.current) canvasEl.current.style.cursor = "";
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              if (isSelected) startDrag(obj.id, e.point);
            }}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={obj.color}
              emissive={showHighlight ? obj.color : "#000000"}
              emissiveIntensity={showHighlight ? 0.35 : 0}
            />
          </mesh>
        );
      })}
    </>
  );
}

export function Scene3D(props: Props) {
  return (
    <div className="w-full h-full min-h-[55dvh] sm:min-h-[300px] bg-base-300 overflow-hidden">
      <Canvas
        camera={{ position: [5, 5, 5], fov: 50 }}
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <SceneContent {...props} />
      </Canvas>
    </div>
  );
}

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

function Background3D() {
  const groupRef = useRef()

  useFrame((state, delta) => {
    groupRef.current.rotation.y += delta * 0.1
  })

  const createHelix = (radius, height, turns, segments) => {
    const points = []
    for (let i = 0; i <= segments; i++) {
      const t = i / segments
      const angle = 2 * Math.PI * turns * t
      const x = radius * Math.cos(angle)
      const y = height * (t - 0.5)
      const z = radius * Math.sin(angle)
      points.push(new THREE.Vector3(x, y, z))
    }
    return points
  }

  const helix1Points = createHelix(3, 20, 2, 100)
  const helix2Points = createHelix(3, 20, 2, 100)

  return (
    <group ref={groupRef}>
      <line>
        <bufferGeometry attach="geometry" setFromPoints={helix1Points} />
        <lineBasicMaterial attach="material" color="#87CEEB" linewidth={2} />
      </line>
      <line>
        <bufferGeometry attach="geometry" setFromPoints={helix2Points} />
        <lineBasicMaterial attach="material" color="#87CEEB" linewidth={2} />
      </line>
      {helix1Points.map((point, index) => (
        <mesh key={`sphere1-${index}`} position={point}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="#87CEEB" />
        </mesh>
      ))}
      {helix2Points.map((point, index) => (
        <mesh key={`sphere2-${index}`} position={point}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="#87CEEB" />
        </mesh>
      ))}
    </group>
  )
}

export default Background3D


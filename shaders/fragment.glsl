uniform float u_intensity;
uniform float u_time;

varying vec2 vUv;
varying float vDisplacement;

void main() {
  float distort = 2.0 * vDisplacement * u_intensity;

  vec3 color = vec3(vUv * (1.0 - distort), 1.0);
  
  return vec4(color ,1.0);
}
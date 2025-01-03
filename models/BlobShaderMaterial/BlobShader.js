import { Abstract } from 'lamina/vanilla'

import fragmentShader from '../../shaders/fragment.glsl'
import vertexShader from '../../shaders/vertex.glsl'

class BlobShader extends Abstract {
  static u_intensity = 0.3;
  static u_time = 0.0;

  static fragmentShader = fragmentShader

  static vertexShader = vertexShader

  constructor(props) {

    super(BlobShader, {
      name: 'BlobShader',
      ...props,
    })
  }
}

export default BlobShader;
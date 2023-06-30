
export default (canvas) => {
	const regl = require('regl')(canvas);
	const drawTriangle = regl({
	  frag: `
	    precision mediump float;
	    uniform vec4 color;
	    void main() {
	      gl_FragColor = color;
	    }`,
	
	  vert: `
	    precision mediump float;
	    attribute vec2 position;
	    void main() {
	      gl_Position = vec4(position, 0, 1);
	    }`,
	  attributes: {
	    position: regl.buffer([
	      [-2, -2],   // no need to flatten nested arrays, regl automatically
	      [4, -2],    // unrolls them into a typedarray (default Float32)
	      [4,  4]
	    ])
	  },
	  uniforms: {
	    color: regl.prop('color')
	  },
	  count: 3
	});

	regl.frame(({time}) => {
	  // clear contents of the drawing buffer
	  regl.clear({
	    color: [0, 0, 0, 0],
	    depth: 1
	  })
	
	  // draw a triangle using the command defined above
	  drawTriangle({
	    color: [
	      Math.cos(time * 0.001),
	      Math.sin(time * 0.0008),
	      Math.cos(time * 0.003),
	      1
	    ]
	  })
	})
};
// regl.frame() wraps requestAnimationFrame and also handles viewport changes

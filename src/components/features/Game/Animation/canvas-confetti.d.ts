declare module 'canvas-confetti' {
	type Shape = 'star' | 'circle' | 'square';
 
	interface Options {
	  particleCount?: number;
	  angle?: number;
	  spread?: number;
	  startVelocity?: number;
	  decay?: number;
	  gravity?: number;
	  drift?: number;
	  ticks?: number;
	  origin?: {
		 x?: number;
		 y?: number;
	  };
	  colors?: string[];
	  shapes?: Shape[];
	  scalar?: number;
	  zIndex?: number;
	  disableForReducedMotion?: boolean;
	}
 
	function create(
	  canvas: HTMLCanvasElement,
	  options?: { resize: boolean; useWorker: boolean }
	): (options?: Options) => void;
 
	function reset(): void;
 
	const confetti: {
	  (options?: Options): Promise<void>;
	  reset: typeof reset;
	  create: typeof create;
	};
 
	export default confetti;
 }
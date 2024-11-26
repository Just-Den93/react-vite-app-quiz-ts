declare module '*.css' {
	const content: Record<string, string>;
	export default content;
 }
 
 declare module '*.svg' {
	import React = require('react');
	export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
	const src: string;
	export default src;
 }
 
 declare module '*.json' {
	const content: any;
	export default content;
 }
 
 interface WebpackContext {
	keys(): string[];
	<T>(id: string): T;
	resolve(id: string): string;
	id: string;
 }
 
 interface NodeRequire {
	context(
	  directory: string,
	  useSubdirectories: boolean,
	  regExp: RegExp
	): WebpackContext;
 }
 
 declare const require: NodeRequire;
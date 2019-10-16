import {
  DefaultBreakpointName,
  defaults,
  createBreakpoint,
  createMap,
} from 'styled-components-breakpoint';

export type BreakpointName = DefaultBreakpointName;
export const breakpoint = createBreakpoint(defaults);
export const map = createMap(defaults);

export {defaults as breakpoints, breakpoint as default};

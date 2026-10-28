import { cybershield } from "./cybershield";
import { frontserve } from "./frontserve";

export type { Diagram, ExplorerData, LayoutName } from "./shared";

/** Architecture figures, by id. FrontServe is the hero; CyberShield sits in its case file. */
export const diagrams = { frontserve, cybershield };

export type DiagramId = keyof typeof diagrams;

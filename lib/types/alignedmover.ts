// Aligned Mover Data Structure
export interface AlignedMover {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: "active" | "inactive" | "pending";
  configuration: AlignedMoverConfig;
  metadata: AlignedMoverMetadata;
  createdAt: string;
  updatedAt: string;
}

export interface AlignedMoverConfig {
  alignment: "left" | "center" | "right" | "justified";
  speed: number;
  direction: "horizontal" | "vertical" | "diagonal";
  easing: "linear" | "ease-in" | "ease-out" | "ease-in-out";
  autoStart: boolean;
  loop: boolean;
}

export interface AlignedMoverMetadata {
  version: string;
  author: string;
  tags: string[];
  priority: number;
}

// Default data structure
export const defaultAlignedMover: AlignedMover = {
  id: "alignedmover001",
  name: "Aligned Mover",
  slug: "alignedmover",
  description: "A precision-aligned movement system for seamless transitions",
  status: "active",
  configuration: {
    alignment: "center",
    speed: 1.0,
    direction: "horizontal",
    easing: "ease-in-out",
    autoStart: false,
    loop: true,
  },
  metadata: {
    version: "1.0.0",
    author: "System",
    tags: ["movement", "alignment", "animation"],
    priority: 1,
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

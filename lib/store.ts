import { create } from "zustand";

export interface Target {
  id: number;
  position: [number, number, number];
  alive: boolean;
  killedAt: number;
}

export type Phase = "idle" | "playing" | "victory";

export interface Tracer {
  id: number;
  from: [number, number, number];
  to: [number, number, number];
  bornAt: number;
}

interface GameState {
  phase: Phase;
  score: number;
  kills: number;
  shots: number;
  targets: Target[];
  tracers: Tracer[];
  lastKillAt: number;
  killStreakCount: number;
  streakLabel: string | null;
  start: () => void;
  killTarget: (id: number) => void;
  addShot: () => void;
  addTracer: (from: [number, number, number], to: [number, number, number]) => void;
  pruneTracers: (now: number) => void;
  reset: () => void;
}

const createInitialTargets = (): Target[] => [
  { id: 1, position: [-7, 1.2, -14], alive: true, killedAt: 0 },
  { id: 2, position: [0, 1.2, -18], alive: true, killedAt: 0 },
  { id: 3, position: [7, 1.2, -14], alive: true, killedAt: 0 },
  { id: 4, position: [-12, 1.2, -22], alive: true, killedAt: 0 },
  { id: 5, position: [12, 1.2, -22], alive: true, killedAt: 0 },
  { id: 6, position: [-4, 1.2, -28], alive: true, killedAt: 0 },
  { id: 7, position: [4, 1.2, -28], alive: true, killedAt: 0 },
];

let tracerId = 0;

export const useGame = create<GameState>((set, get) => ({
  phase: "idle",
  score: 0,
  kills: 0,
  shots: 0,
  targets: createInitialTargets(),
  tracers: [],
  lastKillAt: 0,
  killStreakCount: 0,
  streakLabel: null,

  start: () =>
    set({
      phase: "playing",
      score: 0,
      kills: 0,
      shots: 0,
      targets: createInitialTargets(),
      tracers: [],
      lastKillAt: 0,
      killStreakCount: 0,
      streakLabel: null,
    }),

  killTarget: (id) => {
    const now = performance.now();
    const s = get();
    const streakActive = now - s.lastKillAt < 2000;
    const newStreak = streakActive ? s.killStreakCount + 1 : 1;
    const streakLabel =
      newStreak === 2
        ? "DOUBLE KILL"
        : newStreak === 3
        ? "TRIPLE KILL"
        : newStreak >= 4
        ? "ACE"
        : null;

    const newTargets = s.targets.map((t) =>
      t.id === id ? { ...t, alive: false, killedAt: now } : t
    );
    const allDead = newTargets.every((t) => !t.alive);

    set({
      targets: newTargets,
      kills: s.kills + 1,
      score: s.score + 100,
      lastKillAt: now,
      killStreakCount: newStreak,
      streakLabel,
      phase: allDead ? "victory" : "playing",
    });
  },

  addShot: () => set((s) => ({ shots: s.shots + 1 })),

  addTracer: (from, to) =>
    set((s) => ({
      tracers: [
        ...s.tracers,
        { id: ++tracerId, from, to, bornAt: performance.now() },
      ],
    })),

  pruneTracers: (now) =>
    set((s) => ({
      tracers: s.tracers.filter((t) => now - t.bornAt < 120),
    })),

  reset: () =>
    set({
      phase: "idle",
      score: 0,
      kills: 0,
      shots: 0,
      targets: createInitialTargets(),
      tracers: [],
      killStreakCount: 0,
      streakLabel: null,
    }),
}));

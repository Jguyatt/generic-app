import { create } from 'zustand'

export type Leg = { 
  id: string
  league: string
  market: string
  odds: number
  team?: string
}

export type Parlay = { 
  id: string
  authorId: string
  legs: Leg[]
  stake: number
  createdAt: string
}

export type User = {
  id: string
  name: string
  hitRate?: number
  avgOdds?: number
}

export type Comment = {
  id: string
  threadId: string
  authorId: string
  text: string
  createdAt: string
}

export type Thread = {
  id: string
  title: string
  parlayId: string
  authorId: string
  commentsCount: number
  createdAt: string
}

type State = {
  user: User
  friends: User[]
  parlays: Parlay[]
  threads: Thread[]
  comments: Comment[]
  limits: { 
    dailyStake: number
    remainingStake: number
    dailyDeposit: number
  }
  copyParlay: (id: string) => void
  tweakLeg: (parlayId: string, legIndex: number, update: Partial<Leg>) => void
  postComment: (threadId: string, text: string) => void
  applyStake: (amount: number) => void
  raiseLimit: (request: { newLimit: number; reason: string }) => void
}

export const useStore = create<State>((set, get) => ({
  user: { id: 'u1', name: 'You', hitRate: 0.62, avgOdds: 245 },
  friends: [
    { id: 'u2', name: 'Sam', hitRate: 0.58, avgOdds: 320 },
    { id: 'u3', name: 'Ava', hitRate: 0.65, avgOdds: 180 },
    { id: 'u4', name: 'Mike', hitRate: 0.55, avgOdds: 410 }
  ],
  parlays: [
    { 
      id: 'p1', 
      authorId: 'u2', 
      stake: 10, 
      createdAt: new Date().toISOString(),
      legs: [
        { id: 'l1', league: 'NHL', team: 'Leafs', market: 'Leafs ML', odds: -120 },
        { id: 'l2', league: 'NBA', team: 'Raptors', market: 'Raptors +3.5', odds: +105 },
        { id: 'l3', league: 'NHL', team: 'Oilers', market: 'Over 5.5', odds: +110 },
        { id: 'l4', league: 'NFL', team: 'Bills', market: 'Bills -2.5', odds: -105 }
      ]
    },
    { 
      id: 'p2', 
      authorId: 'u3', 
      stake: 15, 
      createdAt: new Date().toISOString(),
      legs: [
        { id: 'l5', league: 'NFL', team: 'Chiefs', market: 'Chiefs ML', odds: -150 },
        { id: 'l6', league: 'NBA', team: 'Lakers', market: 'Lakers -5.5', odds: -110 },
        { id: 'l7', league: 'NHL', team: 'Bruins', market: 'Bruins ML', odds: +130 }
      ]
    }
  ],
  threads: [
    {
      id: 't1',
      title: 'Saturday Slate',
      parlayId: 'p1',
      authorId: 'u2',
      commentsCount: 3,
      createdAt: new Date().toISOString()
    }
  ],
  comments: [
    {
      id: 'c1',
      threadId: 't1',
      authorId: 'u2',
      text: 'Feeling good about this one! Leafs have been hot lately.',
      createdAt: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: 'c2',
      threadId: 't1',
      authorId: 'u3',
      text: 'Tailing but swapping the Raptors for Lakers -5.5',
      createdAt: new Date(Date.now() - 1800000).toISOString()
    },
    {
      id: 'c3',
      threadId: 't1',
      authorId: 'u1',
      text: 'Love the NHL picks, not sure about the Bills though',
      createdAt: new Date(Date.now() - 900000).toISOString()
    }
  ],
  limits: { 
    dailyStake: 100, 
    remainingStake: 55,
    dailyDeposit: 500
  },
  
  copyParlay: (id) => {
    const p = get().parlays.find(p => p.id === id)
    if (!p) return
    const copy = { 
      ...p, 
      id: `copy-${Date.now()}`, 
      authorId: get().user.id, 
      createdAt: new Date().toISOString() 
    }
    set({ parlays: [copy, ...get().parlays] })
  },

  tweakLeg: (parlayId, legIndex, update) => {
    set({
      parlays: get().parlays.map(p => 
        p.id === parlayId 
          ? { ...p, legs: p.legs.map((leg, idx) => 
              idx === legIndex ? { ...leg, ...update } : leg
            )}
          : p
      )
    })
  },

  postComment: (threadId, text) => {
    const newComment: Comment = {
      id: `c${Date.now()}`,
      threadId,
      authorId: get().user.id,
      text,
      createdAt: new Date().toISOString()
    }
    set({ 
      comments: [...get().comments, newComment],
      threads: get().threads.map(t => 
        t.id === threadId 
          ? { ...t, commentsCount: t.commentsCount + 1 }
          : t
      )
    })
  },

  applyStake: (amount) => {
    const remaining = get().limits.remainingStake
    if (amount <= remaining) {
      set({ 
        limits: { 
          ...get().limits, 
          remainingStake: remaining - amount 
        }
      })
      return true
    }
    return false
  },

  raiseLimit: (request) => {
    // Mock: in real app this would be async and require approval
    console.log('Limit raise requested:', request)
  }
}))


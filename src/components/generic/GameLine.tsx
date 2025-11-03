"use client"

interface GameLineProps {
  game: {
    id: string
    league: string
    away: string
    home: string
    time: string
    live?: boolean
    awayML: number
    homeML: number
    awaySpread: { line: number; odds: number }
    homeSpread: { line: number; odds: number }
    total: { line: number; over: number; under: number }
  }
  onSelect: (pick: string, odds: number) => void
}

export default function GameLine({ game, onSelect }: GameLineProps) {
  return (
    <div className="border border-gray-300 rounded bg-white">
      {/* Header */}
      <div className="bg-gray-100 border-b border-gray-300 px-3 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-700">{game.league}</span>
          <span className="text-xs text-gray-500">{game.time}</span>
          {game.live && (
            <span className="text-xs font-semibold text-red-600 animate-pulse flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 bg-red-600 rounded-full"></span>
              LIVE
            </span>
          )}
        </div>
        <div className="flex gap-8 text-xs font-semibold text-gray-600">
          <span className="w-16 text-center">ML</span>
          <span className="w-16 text-center">Spread</span>
          <span className="w-16 text-center">Total</span>
        </div>
      </div>

      {/* Away Team */}
      <div className="border-b border-gray-200 px-3 py-2 flex items-center justify-between hover:bg-gray-50">
        <div className="font-medium text-gray-800">{game.away}</div>
        <div className="flex gap-8">
          <button
            onClick={() => onSelect(`${game.away} ML`, game.awayML)}
            className="w-16 px-2 py-1 text-sm font-mono bg-gray-100 hover:bg-blue-100 border border-gray-300 rounded text-gray-800"
          >
            {game.awayML > 0 ? `+${game.awayML}` : game.awayML}
          </button>
          <button
            onClick={() => onSelect(`${game.away} ${game.awaySpread.line > 0 ? '+' : ''}${game.awaySpread.line}`, game.awaySpread.odds)}
            className="w-16 px-1 py-1 text-xs bg-gray-100 hover:bg-blue-100 border border-gray-300 rounded"
          >
            <div className="font-medium text-gray-800">{game.awaySpread.line > 0 ? '+' : ''}{game.awaySpread.line}</div>
            <div className="font-mono text-gray-600">{game.awaySpread.odds > 0 ? `+${game.awaySpread.odds}` : game.awaySpread.odds}</div>
          </button>
          <button
            onClick={() => onSelect(`O ${game.total.line}`, game.total.over)}
            className="w-16 px-1 py-1 text-xs bg-gray-100 hover:bg-blue-100 border border-gray-300 rounded"
          >
            <div className="font-medium text-gray-800">O {game.total.line}</div>
            <div className="font-mono text-gray-600">{game.total.over > 0 ? `+${game.total.over}` : game.total.over}</div>
          </button>
        </div>
      </div>

      {/* Home Team */}
      <div className="px-3 py-2 flex items-center justify-between hover:bg-gray-50">
        <div className="font-medium text-gray-800">{game.home}</div>
        <div className="flex gap-8">
          <button
            onClick={() => onSelect(`${game.home} ML`, game.homeML)}
            className="w-16 px-2 py-1 text-sm font-mono bg-gray-100 hover:bg-blue-100 border border-gray-300 rounded text-gray-800"
          >
            {game.homeML > 0 ? `+${game.homeML}` : game.homeML}
          </button>
          <button
            onClick={() => onSelect(`${game.home} ${game.homeSpread.line > 0 ? '+' : ''}${game.homeSpread.line}`, game.homeSpread.odds)}
            className="w-16 px-1 py-1 text-xs bg-gray-100 hover:bg-blue-100 border border-gray-300 rounded"
          >
            <div className="font-medium text-gray-800">{game.homeSpread.line > 0 ? '+' : ''}{game.homeSpread.line}</div>
            <div className="font-mono text-gray-600">{game.homeSpread.odds > 0 ? `+${game.homeSpread.odds}` : game.homeSpread.odds}</div>
          </button>
          <button
            onClick={() => onSelect(`U ${game.total.line}`, game.total.under)}
            className="w-16 px-1 py-1 text-xs bg-gray-100 hover:bg-blue-100 border border-gray-300 rounded"
          >
            <div className="font-medium text-gray-800">U {game.total.line}</div>
            <div className="font-mono text-gray-600">{game.total.under > 0 ? `+${game.total.under}` : game.total.under}</div>
          </button>
        </div>
      </div>
    </div>
  )
}


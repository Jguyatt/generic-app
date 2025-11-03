"use client"

import { useState } from "react"
import GameLine from "@/components/generic/GameLine"
import BetSlip from "@/components/generic/BetSlip"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

interface Selection {
  id: string
  game: string
  pick: string
  odds: number
}

const games = [
  {
    id: "g1",
    league: "NHL",
    away: "Toronto Maple Leafs",
    home: "Montreal Canadiens",
    time: "7:00 PM ET",
    live: true,
    awayML: -145,
    homeML: +125,
    awaySpread: { line: -1.5, odds: +165 },
    homeSpread: { line: +1.5, odds: -190 },
    total: { line: 6.5, over: -105, under: -115 }
  },
  {
    id: "g2",
    league: "NBA",
    away: "Boston Celtics",
    home: "Toronto Raptors",
    time: "7:30 PM ET",
    live: true,
    awayML: -220,
    homeML: +180,
    awaySpread: { line: -5.5, odds: -110 },
    homeSpread: { line: +5.5, odds: -110 },
    total: { line: 218.5, over: -108, under: -112 }
  },
  {
    id: "g3",
    league: "NFL",
    away: "Miami Dolphins",
    home: "Buffalo Bills",
    time: "8:00 PM ET",
    awayML: +155,
    homeML: -185,
    awaySpread: { line: +3.5, odds: -105 },
    homeSpread: { line: -3.5, odds: -115 },
    total: { line: 47.5, over: -110, under: -110 }
  },
  {
    id: "g4",
    league: "NHL",
    away: "Calgary Flames",
    home: "Edmonton Oilers",
    time: "9:00 PM ET",
    awayML: +130,
    homeML: -150,
    awaySpread: { line: +1.5, odds: -175 },
    homeSpread: { line: -1.5, odds: +155 },
    total: { line: 6.0, over: -110, under: -110 }
  },
  {
    id: "g5",
    league: "NBA",
    away: "LA Clippers",
    home: "LA Lakers",
    time: "10:00 PM ET",
    awayML: -110,
    homeML: -110,
    awaySpread: { line: -1.0, odds: -110 },
    homeSpread: { line: +1.0, odds: -110 },
    total: { line: 225.5, over: -105, under: -115 }
  },
  {
    id: "g6",
    league: "NHL",
    away: "Tampa Bay Lightning",
    home: "Florida Panthers",
    time: "7:00 PM ET",
    awayML: +115,
    homeML: -135,
    awaySpread: { line: +1.5, odds: -210 },
    homeSpread: { line: -1.5, odds: +175 },
    total: { line: 5.5, over: -120, under: +100 }
  },
  {
    id: "g7",
    league: "NBA",
    away: "Milwaukee Bucks",
    home: "Chicago Bulls",
    time: "8:00 PM ET",
    awayML: -175,
    homeML: +145,
    awaySpread: { line: -4.5, odds: -108 },
    homeSpread: { line: +4.5, odds: -112 },
    total: { line: 235.5, over: -115, under: -105 }
  },
  {
    id: "g8",
    league: "NFL",
    away: "Green Bay Packers",
    home: "Detroit Lions",
    time: "8:15 PM ET",
    awayML: -125,
    homeML: +105,
    awaySpread: { line: -2.5, odds: -110 },
    homeSpread: { line: +2.5, odds: -110 },
    total: { line: 51.5, over: -105, under: -115 }
  },
  {
    id: "g9",
    league: "NHL",
    away: "Vancouver Canucks",
    home: "Seattle Kraken",
    time: "10:00 PM ET",
    awayML: +140,
    homeML: -165,
    awaySpread: { line: +1.5, odds: -160 },
    homeSpread: { line: -1.5, odds: +135 },
    total: { line: 6.5, over: -110, under: -110 }
  },
  {
    id: "g10",
    league: "NBA",
    away: "Phoenix Suns",
    home: "Golden State Warriors",
    time: "10:30 PM ET",
    awayML: +165,
    homeML: -195,
    awaySpread: { line: +5.0, odds: -115 },
    homeSpread: { line: -5.0, odds: -105 },
    total: { line: 229.5, over: -110, under: -110 }
  },
  {
    id: "g11",
    league: "NHL",
    away: "Pittsburgh Penguins",
    home: "New York Rangers",
    time: "7:30 PM ET",
    awayML: +120,
    homeML: -140,
    awaySpread: { line: +1.5, odds: -195 },
    homeSpread: { line: -1.5, odds: +165 },
    total: { line: 6.0, over: +105, under: -125 }
  },
  {
    id: "g12",
    league: "NBA",
    away: "Dallas Mavericks",
    home: "Houston Rockets",
    time: "8:30 PM ET",
    awayML: -190,
    homeML: +160,
    awaySpread: { line: -4.0, odds: -110 },
    homeSpread: { line: +4.0, odds: -110 },
    total: { line: 223.5, over: -112, under: -108 }
  }
]

export default function GenericDemoPage() {
  const [selections, setSelections] = useState<Selection[]>([])
  const [error, setError] = useState(false)

  const handleSelectOdds = (gameId: string, pick: string, odds: number) => {
    const game = games.find(g => g.id === gameId)
    if (!game) return

    const newSelection: Selection = {
      id: `${gameId}-${Date.now()}`,
      game: `${game.away} @ ${game.home}`,
      pick,
      odds
    }

    setSelections(prev => [...prev, newSelection])
  }

  const handleRemove = (id: string) => {
    setSelections(prev => prev.filter(s => s.id !== id))
  }

  const handlePlaceBet = () => {
    setError(true)
    setTimeout(() => {
      setSelections([])
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
      {/* Header */}
      <header className="border-b border-gray-300 bg-white px-3 py-2 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-base sm:text-xl font-bold text-gray-800">Generic Betting App</h1>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-xs sm:text-sm text-gray-600">Balance: $1,000</span>
            <button className="px-2 py-1 sm:px-3 bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs sm:text-sm rounded border border-gray-300">
              Account
            </button>
          </div>
        </div>
      </header>

      {/* Multiple warning banners - mobile optimized */}
      <div className="bg-yellow-50 border-b border-yellow-200 px-2 py-1.5">
        <p className="text-[10px] sm:text-xs text-yellow-800 text-center max-w-7xl mx-auto">
          ⚠️ Odds updated 2 min ago • Lines may change • Account verification required
        </p>
      </div>
      
      <div className="bg-orange-50 border-b border-orange-200 px-2 py-1.5 hidden sm:block">
        <p className="text-xs text-orange-800 text-center max-w-7xl mx-auto">
          🔒 Enhanced security enabled • All bets require 2FA • Maximum processing time: 72 hours
        </p>
      </div>

      <div className="bg-red-50 border-b border-red-200 px-2 py-1.5">
        <p className="text-[10px] sm:text-xs text-red-800 text-center max-w-7xl mx-auto">
          ⚠️ NOTICE: Bets over $50 require manual review • Risk of loss
        </p>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-3 sm:py-6">
        {/* Account status banner - mobile optimized */}
        <div className="mb-3 sm:mb-6 border border-blue-300 bg-blue-50 rounded p-2 sm:p-4">
          <h3 className="text-xs sm:text-sm font-semibold text-blue-900 mb-2">📋 Account Status</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 text-[10px] sm:text-xs">
            <div>
              <p className="text-blue-700 mb-0.5 sm:mb-1">ID Verification:</p>
              <p className="text-blue-900 font-medium">✓ Verified</p>
            </div>
            <div>
              <p className="text-blue-700 mb-0.5 sm:mb-1">Daily Limit:</p>
              <p className="text-blue-900 font-medium">$450 / $1,000</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-blue-700 mb-0.5 sm:mb-1">Withdrawals:</p>
              <p className="text-blue-900 font-medium">Processing (5-7d)</p>
            </div>
          </div>
          <p className="text-[10px] sm:text-xs text-blue-700 mt-2">
            <a href="#" className="underline">Complete verification</a> to increase limits
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-3 sm:gap-6">
          {/* Games section */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800">Today's Games</h2>
              <div className="flex gap-1 sm:gap-2">
                <button className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-blue-600 text-white rounded">All</button>
                <button className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-gray-200 text-gray-700 rounded">NHL</button>
                <button className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-gray-200 text-gray-700 rounded">NBA</button>
                <button className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-gray-200 text-gray-700 rounded">NFL</button>
              </div>
            </div>

            {error && (
              <Alert className="border-red-200 bg-red-50 text-red-900 mb-4">
                <AlertTitle className="font-semibold">Bet Rejected</AlertTitle>
                <AlertDescription>
                  Sorry, we were unable to process your bet. Odds have changed or the event has started. Please try again.
                </AlertDescription>
              </Alert>
            )}

            {/* Trending Parlays Section */}
            <div className="mb-4 border border-green-300 bg-green-50 rounded p-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-green-900 flex items-center gap-2">
                  🔥 Popular Parlays Today
                </h3>
                <span className="text-xs text-green-700">47,382 bettors</span>
              </div>
              <div className="space-y-2">
                <div className="bg-white rounded p-2 text-xs border border-green-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">3-Leg NHL Parlay</p>
                      <p className="text-[10px] text-gray-600">Leafs ML • Oilers -1.5 • Over 6.5</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono font-bold text-green-700">+485</p>
                      <button className="text-[10px] text-blue-600 hover:underline">Add</button>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded p-2 text-xs border border-green-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">4-Leg Same Game</p>
                      <p className="text-[10px] text-gray-600">Bills -3.5 • Over 47.5 • Allen 2+ TDs • More</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono font-bold text-green-700">+1240</p>
                      <button className="text-[10px] text-blue-600 hover:underline">Add</button>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-green-700 mt-2">
                ℹ️ Popular parlays are for entertainment only. Past performance doesn't guarantee future results.
              </p>
            </div>

            {/* Player Props Teaser */}
            <div className="mb-4 border border-purple-300 bg-purple-50 rounded p-3">
              <h3 className="text-sm font-bold text-purple-900 mb-2">🎯 Featured Player Props</h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white rounded p-2 border border-purple-200">
                  <p className="font-medium text-gray-800 truncate">Connor McDavid</p>
                  <p className="text-[10px] text-gray-600">Over 0.5 Goals</p>
                  <p className="font-mono text-purple-700">-135</p>
                </div>
                <div className="bg-white rounded p-2 border border-purple-200">
                  <p className="font-medium text-gray-800 truncate">Jayson Tatum</p>
                  <p className="text-[10px] text-gray-600">Over 25.5 Pts</p>
                  <p className="font-mono text-purple-700">+110</p>
                </div>
                <div className="bg-white rounded p-2 border border-purple-200">
                  <p className="font-medium text-gray-800 truncate">Josh Allen</p>
                  <p className="text-[10px] text-gray-600">Over 1.5 TDs</p>
                  <p className="font-mono text-purple-700">-105</p>
                </div>
                <div className="bg-white rounded p-2 border border-purple-200">
                  <p className="font-medium text-gray-800 truncate">Auston Matthews</p>
                  <p className="text-[10px] text-gray-600">Anytime Goal</p>
                  <p className="font-mono text-purple-700">+155</p>
                </div>
              </div>
              <button className="w-full mt-2 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs rounded">
                View 250+ More Props →
              </button>
            </div>

            {/* Terms reminder */}
            <div className="mb-4 border border-gray-300 bg-white rounded p-3 text-xs text-gray-700">
              <p className="font-semibold mb-1">⚠️ Before You Bet:</p>
              <ul className="list-disc pl-5 space-y-0.5 text-gray-600">
                <li>You must be 21+ and located in an approved jurisdiction</li>
                <li>All transactions are subject to review and may be delayed</li>
                <li>Odds are for reference only and may change before confirmation</li>
                <li>Account verification may be required at any time</li>
                <li>Problem gambling? Call 1-800-GAMBLER or visit BeGambleAware.org</li>
              </ul>
            </div>
            
            {/* Live In-Game Alert */}
            <div className="mb-4 border-2 border-red-400 bg-red-50 rounded p-3 animate-pulse">
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 bg-red-600 rounded-full"></span>
                <h3 className="text-sm font-bold text-red-900">🔴 LIVE NOW</h3>
              </div>
              <p className="text-xs text-red-800 mt-1">
                2 games in progress! Odds updating every 10 seconds. Act fast!
              </p>
            </div>

            <div className="space-y-3">
              {games.map(game => (
                <GameLine 
                  key={game.id} 
                  game={game}
                  onSelect={(pick, odds) => handleSelectOdds(game.id, pick, odds)}
                />
              ))}
            </div>

            {/* Futures Section */}
            <div className="mt-4 border border-blue-300 bg-blue-50 rounded p-3 text-xs">
              <h3 className="text-sm font-bold text-blue-900 mb-2">📅 Futures & Championships</h3>
              <div className="space-y-1.5">
                <div className="flex justify-between bg-white p-2 rounded border border-blue-200">
                  <span className="text-gray-800">Stanley Cup Winner: Oilers</span>
                  <span className="font-mono text-blue-700">+850</span>
                </div>
                <div className="flex justify-between bg-white p-2 rounded border border-blue-200">
                  <span className="text-gray-800">NBA Champion: Celtics</span>
                  <span className="font-mono text-blue-700">+320</span>
                </div>
                <div className="flex justify-between bg-white p-2 rounded border border-blue-200">
                  <span className="text-gray-800">Super Bowl Winner: Bills</span>
                  <span className="font-mono text-blue-700">+450</span>
                </div>
              </div>
              <button className="w-full mt-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded">
                View All Futures Markets
              </button>
            </div>

            {/* Promotions disclaimer */}
            <div className="mt-4 border border-purple-200 bg-purple-50 rounded p-3 text-xs">
              <p className="font-semibold text-purple-900 mb-1">🎁 Promotions & Bonuses</p>
              <p className="text-purple-800">
                New user bonus available! Deposit $100, get $20 bonus. 
                <a href="#" className="underline ml-1">View full terms</a>
              </p>
              <p className="text-purple-700 mt-2 text-[10px]">
                Bonus requires 10x rollover. Parlay bets only count as 50% toward rollover. 
                Restrictions apply. Max bonus $500. Expires 30 days after deposit. Void where prohibited.
              </p>
            </div>

            {/* Refer a Friend Banner */}
            <div className="mt-4 border border-orange-300 bg-gradient-to-r from-orange-50 to-yellow-50 rounded p-3 text-xs">
              <h3 className="text-sm font-bold text-orange-900 mb-1">👥 Refer & Earn!</h3>
              <p className="text-orange-800">
                Get $50 for every friend who deposits $100+! <a href="#" className="underline font-semibold">Invite Now</a>
              </p>
            </div>

            {/* Odds Boost Section */}
            <div className="mt-4 border-2 border-yellow-400 bg-yellow-50 rounded p-3 text-xs">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-yellow-900">⚡ Daily Odds Boost</h3>
                <span className="text-xs bg-yellow-300 text-yellow-900 px-2 py-0.5 rounded font-semibold">TODAY ONLY</span>
              </div>
              <div className="bg-white rounded p-2 border border-yellow-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">Lakers + Celtics Parlay</p>
                    <p className="text-[10px] text-gray-600">Both teams to win tonight</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-500 line-through">+320</p>
                    <p className="font-mono font-bold text-green-700 text-base">+450</p>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-yellow-800 mt-2">
                Max stake $25. One per customer. Boost expires at midnight ET.
              </p>
            </div>
          </div>

          {/* Bet Slip - Desktop only, mobile uses bottom sheet */}
          <div className="hidden lg:block lg:col-span-1">
            <BetSlip 
              selections={selections}
              onRemove={handleRemove}
              onPlaceBet={handlePlaceBet}
            />
          </div>
        </div>
      </div>

      {/* Mobile Bet Slip - Fixed bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t-2 border-gray-300 shadow-lg">
        {selections.length === 0 ? (
          <div className="p-3 text-center">
            <p className="text-xs text-gray-500">Tap odds to add to bet slip</p>
          </div>
        ) : (
          <div className="p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-800">
                {selections.length} selection{selections.length > 1 ? 's' : ''}
              </span>
              <button 
                onClick={() => {
                  const modal = document.getElementById('mobile-bet-slip-modal')
                  if (modal) modal.classList.remove('hidden')
                }}
                className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg active:bg-green-700"
              >
                Review Bet →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Bet Slip Modal */}
      <div id="mobile-bet-slip-modal" className="hidden lg:hidden fixed inset-0 z-50 bg-black/50">
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-300 p-3 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800">Bet Slip</h3>
            <button 
              onClick={() => {
                const modal = document.getElementById('mobile-bet-slip-modal')
                if (modal) modal.classList.add('hidden')
              }}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
          <div className="p-4">
            <BetSlip 
              selections={selections}
              onRemove={handleRemove}
              onPlaceBet={handlePlaceBet}
            />
          </div>
        </div>
      </div>

      {/* Footer disclaimer */}
      <footer className="border-t border-gray-300 bg-gray-100 px-4 py-6 mt-12">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="grid md:grid-cols-4 gap-4 text-xs text-gray-700">
            <div>
              <p className="font-semibold mb-2">Legal</p>
              <ul className="space-y-1 text-gray-600">
                <li><a href="#" className="hover:underline">Terms of Service</a></li>
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline">Cookie Policy</a></li>
                <li><a href="#" className="hover:underline">Licensing Information</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-2">Responsible Gaming</p>
              <ul className="space-y-1 text-gray-600">
                <li><a href="#" className="hover:underline">Set Limits</a></li>
                <li><a href="#" className="hover:underline">Self-Exclusion</a></li>
                <li><a href="#" className="hover:underline">Get Help</a></li>
                <li><a href="#" className="hover:underline">Reality Check</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-2">Support</p>
              <ul className="space-y-1 text-gray-600">
                <li><a href="#" className="hover:underline">Help Center</a></li>
                <li><a href="#" className="hover:underline">Contact Us</a></li>
                <li><a href="#" className="hover:underline">Verification FAQs</a></li>
                <li><a href="#" className="hover:underline">Withdrawal Times</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-2">Hotlines</p>
              <ul className="space-y-1 text-gray-600">
                <li>Problem Gambling: 1-800-GAMBLER</li>
                <li>National Council: 1-800-522-4700</li>
                <li>Crisis Support: 1-800-273-8255</li>
                <li>Customer Service: 1-888-555-0123</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-300 pt-4 text-center text-xs text-gray-600 space-y-2">
            <p className="font-semibold">IMPORTANT DISCLAIMER</p>
            <p>
              Must be 21+ to bet. Gambling problem? Call 1-800-GAMBLER. Available in select states only. 
              Void where prohibited. All wagers are subject to house rules. Odds subject to change. 
              Maximum payout $100,000. Processing fees may apply. Account verification required. 
              Withdrawals may take 5-10 business days. Promotional terms apply.
            </p>
            <p className="text-[10px] mt-2">
              Licensed and regulated by [State Gaming Commission]. License #12345-ABC. 
              © 2024 Generic Betting App. All rights reserved. Unauthorized use strictly prohibited.
              If you or someone you know has a gambling problem, help is available. Visit BeGambleAware.org or call 1-800-GAMBLER.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

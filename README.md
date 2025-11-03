# MikeBets Demo

A comprehensive Next.js demo showcasing a social betting platform with responsible gaming features.

## Features

- **Social Betting**: Copy and tweak parlays from friends
- **Parlay Builder**: Build custom parlays or tail from friends
- **Comment Threads**: Discuss bets with your network
- **Responsible Gaming**: Daily limits, self-exclusion, and player protection
- **KYC/AML Flow**: Identity verification walkthrough
- **Trust & Compliance**: Security features and regulatory compliance
- **12-Month Roadmap**: Product launch timeline
- **Waitlist CTA**: Email capture for early access

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful UI components
- **Zustand** - State management
- **Sonner** - Toast notifications
- **Lucide React** - Icons
- **date-fns** - Date formatting

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
  app/                  # Next.js App Router pages
    page.tsx           # Feed (cold open scenario)
    demo/
      builder/         # Parlay builder
      thread/          # Comments thread
      limits/          # Responsible gaming limits
      kyc/             # KYC/AML verification
      trust/           # Compliance & security
      roadmap/         # 12-month timeline
      waitlist/        # CTA page
      generic/         # "Bad UX" contrast demo
  components/
    parlay/            # Parlay-related components
    social/            # Comments & threads
    rg/                # Responsible gaming
    trust/             # KYC, security, compliance
    marketing/         # CTA & roadmap
    generic/           # Generic app contrast
    ui/                # shadcn/ui components
  lib/
    store.ts           # Zustand state management
    odds.ts            # Odds calculation helpers
    mock.ts            # Seed data
    ui.ts              # UI utilities
```

## Demo Flow

1. **Feed** (`/`) - Cold open with friend notifications and parlays
2. **Builder** (`/demo/builder`) - Build or tail parlays with real-time odds
3. **Thread** (`/demo/thread`) - Comment on bets with friends
4. **Limits** (`/demo/limits`) - Manage responsible gaming limits
5. **KYC** (`/demo/kyc`) - Identity verification flow
6. **Trust** (`/demo/trust`) - Security & compliance showcase
7. **Roadmap** (`/demo/roadmap`) - 12-month launch timeline
8. **Waitlist** (`/demo/waitlist`) - Email capture CTA
9. **Generic** (`/demo/generic`) - Bad UX contrast demo

## Key Features

### Responsible Gaming
- Daily stake limits with friction-full raise flow
- Visual gauge showing remaining limit
- Self-exclusion options
- Help resources

### Social Features
- Copy & tweak friends' parlays
- Comment threads on bets
- Friend activity feed
- User statistics (hit rate, avg odds)

### Compliance
- KYC/AML verification flow
- Security infrastructure details
- Regulatory commitments
- Age & location restrictions

## Mock Data

All data is mocked using Zustand. No backend required. State includes:
- 3 friends with statistics
- 2 sample parlays
- 1 active thread with comments
- Daily limits ($100/$55 remaining)

## Design System

- **Typography**: System font stack
- **Aesthetic**: iOS-native cards, soft shadows, rounded-2xl
- **Spacing**: 8/12/16px scale
- **Motion**: 200-300ms ease transitions
- **Colors**: Tailwind default palette
- **Responsive**: Mobile-first with breakpoints

## Build & Deploy

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm start
```

## License

Demo only - Not for production use.

## Disclaimer

⚠️ **This is a demonstration only.**
- No real money
- No actual betting
- No backend integration
- For educational purposes

19+ · Ontario · Play Responsibly


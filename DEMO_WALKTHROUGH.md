# MikeBets Demo Walkthrough

## 5-Minute Product Demo Script

### 1. Cold Open - The Feed (30 seconds)
**URL**: `http://localhost:3000`

- Show friend activity notifications
- Point out Sam's 4-leg parlay
- Highlight "Copy & Tweak" button
- Note the responsible gaming ribbon at top

**Key Message**: "Friends are already betting. You can see what they're doing and learn from them."

---

### 2. Social Parlay - Copy & Tweak (60 seconds)
**URL**: `http://localhost:3000/demo/builder`

- Click "Copy & Tweak" on Sam's parlay (or navigate to Builder)
- Switch to "Tail from Friends" tab
- Show copied parlay
- Click "Build from Scratch" tab
- Add a leg by clicking game markets
- Show how odds recalculate in real-time
- Note the limit gauge at top
- Try to "Lock Slip" with stake slider

**Key Message**: "No manual entry. Just copy, tweak one leg, and you're done."

---

### 3. Comments Thread (30 seconds)
**URL**: `http://localhost:3000/demo/thread`

- Show "Saturday Slate" discussion
- Read comments from Sam and Ava
- Use composer to add a new comment
- Show toast notification

**Key Message**: "Betting is social. Discuss picks, share insights, learn together."

---

### 4. Responsible Limits (60 seconds)
**URL**: `http://localhost:3000/demo/limits`

- Show limit gauge (45% used)
- Click "Adjust" on Daily Stake Limit
- Try to raise limit → requires reason
- Show two paths: "Keep Limit" vs "Request Change"
- Note pending review flow

**Key Message**: "Limits are not optional. Raising them requires friction and human review."

---

### 5. KYC/AML Flow (45 seconds)
**URL**: `http://localhost:3000/demo/kyc`

- Step 1: ID upload (mock)
- Step 2: Liveness check animation
- Step 3: Success state
- Show "What happens next?" details

**Key Message**: "Everyone verifies. No exceptions. We're compliant from day one."

---

### 6. Trust & Security (30 seconds)
**URL**: `http://localhost:3000/demo/trust`

- Show 4 compliance badges
- Point out security infrastructure panel
- Note encryption, segregated workloads, audit logging

**Key Message**: "We take security and compliance seriously. Built for regulation."

---

### 7. Roadmap (30 seconds)
**URL**: `http://localhost:3000/demo/roadmap`

- Show 3 phases: Build → Regulatory → Launch
- Note 0-6, 6-10, 10-12 month tracks
- Point out "Private beta" and "iGaming Ontario license"

**Key Message**: "We're methodical. Testing first, license second, launch last."

---

### 8. Waitlist CTA (30 seconds)
**URL**: `http://localhost:3000/demo/waitlist`

- Show hero messaging: "Bet Together. Win Together."
- Enter email → Join waitlist
- Show success toast
- Note 19+ / Ontario disclaimer

**Key Message**: "Join the waitlist. We launch in Ontario first."

---

### 9. BONUS: Generic App Contrast (30 seconds)
**URL**: `http://localhost:3000/demo/generic`

- Show manual 5-leg entry form
- Try to submit → always fails with "too late" error
- Contrast with MikeBets' Copy & Tweak

**Key Message**: "This is what we're NOT building. Manual, generic, frustrating."

---

## Navigation Tips

- Use top nav bar to jump between sections
- All interactions show toast notifications
- No backend — everything is mocked
- Refresh to reset state

## Key Demo Talking Points

1. **Social First**: Copy parlays, not Excel sheets
2. **Responsible Built-In**: Limits aren't optional add-ons
3. **Compliant by Design**: KYC, AML, age verification from day one
4. **Ontario Launch**: Regulated market, license-first approach
5. **Contrast Demo**: Show what we're avoiding (Generic page)

## Technical Notes

- Next.js 15 + TypeScript
- Zustand state management
- shadcn/ui components
- All data mocked (no API calls)
- Responsive mobile-first design

---

**Demo Status**: ✅ Ready for presentation


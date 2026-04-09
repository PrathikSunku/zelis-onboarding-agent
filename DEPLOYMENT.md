# Zelis Onboarding Agent — Deployment Guide

## Local Development (Already Running)

Your app is currently running locally with:
- **Frontend**: Vite dev server (Port 5173)
- **Backend**: Express (Port 3001)

To start locally:
```bash
npm run dev  # Starts Vite frontend
npm run server  # Starts Express backend in separate terminal
```

---

## Production Deployment Strategy

### Option A: Vercel (Recommended — Easiest)

**Why Vercel?** Zero-config deployment for full-stack apps, automatic scaling, environment variables management.

#### Steps:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/zelis-onboarding-agent.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Add New..." → "Project"
   - Select your repository
   - Vercel will auto-detect Vite + Express

3. **Configure Environment Variables**
   - In Vercel dashboard: Settings → Environment Variables
   - Add: `ANTHROPIC_API_KEY` = your key (Project → Production)
   - Deploy

4. **Update API calls in frontend**
   - In `src/claude.ts`, change localhost to your Vercel domain:
   ```typescript
   const API_BASE = process.env.VITE_API_URL || 'https://your-app.vercel.app';
   ```

5. **The server.ts will auto-handle** Vercel's serverless execution.

**Cost**: Free tier available (up to 100 deployments/month). Pro plan $20/month for production.

---

### Option B: Railway (Simple, Great for Node Apps)

**Why Railway?** Simple Node hosting, good free tier, automatic deployments from GitHub.

#### Steps:

1. **Connect your repo**
   - Go to [railway.app](https://railway.app)
   - Click "New Project" → "Deploy from GitHub"
   - Select your repository

2. **Add Environment Variables**
   - In Railway dashboard: Variables
   - Add `ANTHROPIC_API_KEY`

3. **Set build & start commands**
   - Build: `npm run build`
   - Start: `npm run server` (for Express)
   - Railway auto-detects and runs both

4. **Update frontend API endpoint**
   - In `src/claude.ts`:
   ```typescript
   const API_BASE = process.env.VITE_API_URL || 'https://your-railway-app.up.railway.app';
   ```

**Cost**: Free tier ($5/month credit), paid plans start at $5/month.

---

### Option C: AWS/Lambda (Most Control, Most Complex)

For production-grade infrastructure:
- **Frontend**: S3 + CloudFront (CDN)
- **Backend**: API Gateway + Lambda
- **Environment**: RDS or DynamoDB for any future state

This is overkill for demos but ideal for enterprise deployment.

---

## Key Configuration Steps (All Deployments)

### 1. Environment Variables
Create `.env.production`:
```
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxx
VITE_API_URL=https://your-production-domain.com
```

### 2. CORS Configuration
In `server.ts`, update CORS to allow your production domain:
```typescript
app.use(cors({
  origin: ['https://your-production-domain.com', 'http://localhost:3000'],
  credentials: true,
}));
```

### 3. Frontend API Configuration
In `src/claude.ts`:
```typescript
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function chat(messages, persona) {
  const response = await fetch(`${API_BASE}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, persona }),
  });
  // ...
}
```

### 4. Build Configuration
Ensure `vite.config.ts` is set up for production:
```typescript
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
```

---

## True Agentic Features (What You're Showing)

### Current Implementation:
1. **Agent Orchestration** — Claude reasoning to decide which agents to call
2. **Multi-step Tool Use** — Agents calling other agents in sequence
3. **Context Synthesis** — Combining data from multiple agents into cohesive answers
4. **Persona-aware Routing** — Different responses based on role/department/country

### New Showcase Mode:
The **Orchestration Showcase** tab demonstrates:
- **Claude's Reasoning**: Why it chose specific agents
- **Agent Sequencing**: Which agents it called and in what order
- **Data Flow**: How responses from one agent inform subsequent calls
- **Synthesis**: Final answer synthesized from agent data

This visually proves the system is **intelligent agent coordination**, not just static simulation.

---

## Demo Scripts

### For a 10-minute Demo:
1. Start with **Phase Preboarding** (welcome screen)
2. Show **Guided Scenario** (auto-typing messages, tool calls)
3. Switch to **Showcase Tab** and run a complex query like:
   - "What systems do I need access to and how long does setup take?"
   - "What are my benefits options and compliance deadlines?"
4. Show the step-by-step orchestration visualization
5. Open **Free Chat** and ask a natural question (show real Claude reasoning)
6. Switch personas (show how context changes)

### Talking Points:
- "This isn't a chatbot — it's a multi-agent system orchestrating specialized tools"
- "Claude decides which agents to call based on understanding the query"
- "Each agent connects to a real system (Workday, Jira, Zhub, etc.)"
- "The same system routes to different agents depending on the question"
- "Currently simulated for demo; production would connect to real APIs"

---

## Cost Estimation

| Platform | Monthly Cost | Best For |
|----------|-------------|----------|
| Vercel | Free - $20 | Quick demos, fast iteration |
| Railway | Free - $20 | Hobby projects, prototyping |
| AWS Lambda | $1 - $50 | Production, high volume |

**API Costs** (separate from hosting):
- Claude API: ~$3 per 1000 requests (depends on model & tokens used)
- For demos: Minimal (maybe $0.10/month if 100 queries/day)

---

## Monitoring & Logs

### Vercel:
- Dashboard → Deployments → Logs tab
- Real-time streaming of errors and console.log

### Railway:
- Dashboard → Logs tab
- Scroll through deployment and runtime logs

### Local:
```bash
# Terminal 1
npm run dev

# Terminal 2
npm run server
# Logs will appear directly
```

---

## Next Steps

1. **Choose platform** (Vercel recommended for simplicity)
2. **Push to GitHub** (required for Vercel/Railway)
3. **Add environment variables** (ANTHROPIC_API_KEY)
4. **Deploy** (one-click in Vercel/Railway)
5. **Share the URL** with stakeholders

All deployment options take 5-10 minutes to set up.

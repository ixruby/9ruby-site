import { HOME_INTENTS, type HomeIntent, type HomeRankable, type IntentScoreMap } from "@/lib/home-content"

const MAX_INTENT_SCORE = 36

export const createEmptyIntentScores = (): IntentScoreMap =>
  HOME_INTENTS.reduce((scores, intent) => {
    scores[intent] = 0
    return scores
  }, {} as IntentScoreMap)

export const isHomeIntent = (value: string | null | undefined): value is HomeIntent =>
  Boolean(value && HOME_INTENTS.includes(value as HomeIntent))

export const parseIntentList = (value: string | null | undefined): HomeIntent[] => {
  if (!value) return []

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(isHomeIntent)
}

export const sanitizeIntentScores = (input: unknown): IntentScoreMap => {
  const next = createEmptyIntentScores()

  if (!input || typeof input !== "object") return next

  for (const intent of HOME_INTENTS) {
    const raw = (input as Partial<Record<HomeIntent, unknown>>)[intent]
    const value = typeof raw === "number" && Number.isFinite(raw) ? raw : 0
    next[intent] = Math.min(MAX_INTENT_SCORE, Math.max(0, value))
  }

  return next
}

export const boostIntentScore = (
  scores: IntentScoreMap,
  intent: HomeIntent,
  amount: number,
): IntentScoreMap => ({
  ...scores,
  [intent]: Math.min(MAX_INTENT_SCORE, Math.max(0, scores[intent] + amount)),
})

export const getIntentScoreTotal = (scores: IntentScoreMap) =>
  HOME_INTENTS.reduce((total, intent) => total + scores[intent], 0)

export const resolveTopIntent = (
  scores: IntentScoreMap,
  fallback: HomeIntent = "ai-agents",
): HomeIntent => {
  let topIntent = fallback
  let topScore = scores[fallback] ?? 0

  for (const intent of HOME_INTENTS) {
    if (scores[intent] > topScore) {
      topIntent = intent
      topScore = scores[intent]
    }
  }

  return topScore > 0 ? topIntent : fallback
}

export const getRankScore = (
  item: HomeRankable,
  scores: IntentScoreMap,
  activeIntent: HomeIntent,
  activeWeight = 2.75,
) => {
  const behaviorScore = item.intents.reduce((total, intent) => total + scores[intent], 0)
  const activeScore = item.intents.includes(activeIntent) ? activeWeight : 0
  const primaryScore = item.primaryIntent === activeIntent ? 0.75 : 0

  return behaviorScore + activeScore + primaryScore
}

export const rankHomeItems = <Item extends HomeRankable>(
  items: readonly Item[],
  scores: IntentScoreMap,
  activeIntent: HomeIntent,
  activeWeight?: number,
): Item[] =>
  items
    .map((item, index) => ({
      item,
      index,
      score: getRankScore(item, scores, activeIntent, activeWeight),
    }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map(({ item }) => item)

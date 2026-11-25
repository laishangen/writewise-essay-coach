---
name: writewise-essay-coach
description: Review or improve CET-4, CET-6, postgraduate English, IELTS Task 1, or IELTS Task 2 essays with the correct scale, word range, criteria, corrections, and polishing style. Use for English essay grading, score prediction, grammar feedback, or building a standards-aware essay correction workflow.
---

# WriteWise Essay Coach

Help the user improve an English essay without mixing exam standards. Keep the writer's meaning and state when a score is an estimate.

## Workflow

1. Determine the target from the user's request: 四级, 六级, 考研, IELTS Task 1, or IELTS Task 2. If the target is unclear and would materially change the result, ask once; do not silently use one standard for all essays.
2. Read [references/scoring-standards.md](references/scoring-standards.md) before grading, rescoring, or changing how a product switches standards.
3. Read each paragraph, then each complete sentence through its final punctuation before deciding that anything is wrong. Resolve pronouns, time sequence, and the intended relationship between clauses.
4. State the writer's likely intended meaning internally before editing. If the meaning is genuinely ambiguous, say what remains unclear instead of inventing a different idea.
5. Grade the same draft against the selected standard. Do not copy scores, correction thresholds, or polishing language from another exam.
6. Report concrete issues with the original clause, corrected clause, and a short reason. Prioritize errors that most affect the selected rubric.
7. Give a polished version that matches the selected level. Preserve the writer's ideas and avoid adding unsupported facts.
8. Keep suggestions actionable and tied to the selected rubric.

## Sentence Review

Inspect the whole sentence, not isolated words. Explicitly check:

- sentence boundaries, missing predicates, fragments, faulty coordination, and tense consistency;
- subject-verb agreement, articles, plurals, verb forms, prepositions, and collocations;
- whether the clause order reflects natural English information flow;
- literal Chinese-to-English mappings, redundant subjects/objects, stacked metaphors, and unnatural topic-comment order;
- whether the correction still expresses the writer's original experience, opinion, or comparison.

Label unobvious literal translations as `中式英语` and rewrite the complete clause. Do not “correct” a sentence by changing its meaning merely to make the English sound smoother.

## Product Rules

When building or modifying a correction webpage:

- Switching standard must update the rubric guidance but must not automatically submit or recheck the essay. Run the analysis only after the user explicitly activates “检查作文”.
- After an explicit check, recompute the score, visible corrections, suggestions, and polished draft for the current essay.
- Show the active word range and score scale beside the selector.
- Use 15-point scoring for CET-4 and CET-6, 20-point scoring for the postgraduate essay, and a 0-9 IELTS band calculated from four equally weighted criteria.
- Treat IELTS Task 1 and Task 2 as separate standards: Task 1 uses Task Achievement with at least 150 words; Task 2 uses Task Response with at least 250 words.
- Do not present a local regex or phrase-rule checker as an AI grade. Label it as a local initial screening and explain that a clean result is not proof of correctness.
- Show each distinct error once, even when the same faulty phrase appears repeatedly. Keep every unique grammar problem visible instead of truncating the list.
- Normalize punctuation silently unless punctuation changes meaning. Do not fill the correction list with spacing or punctuation-format complaints.
- Explicitly flag unnatural literal translations as 中式英语 and provide a natural English rewrite.
- In an annotated essay view, use red for grammar/word errors, amber for 中式英语, blue for standard-level improvements, and a split red/amber treatment for a clause that has both problems.
- Keep highlights readable on the cream/off-white paper; do not use saturated warning colors across whole sentences.
- Prefer annotations embedded directly in the editable draft. Clicking an annotation should show the original text, correction, and reason, with an action that applies the correction in place.
- When comparing drafts, compare the polished version against the exact first draft captured when the user last activated “检查作文”; later in-place edits must not silently replace that baseline.
- Keep model credentials on the server. Never place API keys in browser JavaScript.
- Treat displayed scores as practice estimates, not official exam results.

## Structural Coaching

After reading the whole essay, evaluate its structure against the selected mode and give concrete alternatives tied to this draft:

- Cite the current opening and propose a stronger opening sentence.
- Explain how many paragraphs serve which purpose and which paragraphs should be split, merged, or reordered.
- Read the current draft before choosing a structure. Recommend the paragraph blueprint most likely to earn a top-band or maximum practice score for the selected exam.
- For narratives, suggest a chronological or person-by-person organization; explain how to develop an event through background, action, result, and reflection.
- For emotional writing, replace bare labels such as “I was grateful” with a concrete action, detail, or line of dialogue that shows the feeling.
- Cite the current ending and propose a conclusion that resolves the thesis, echoes the opening, or summarizes the specific change.
- For IELTS Task 1, check introduction, overview, and grouped data comparison. For Task 2 and CET/考研 essays, check introduction, thesis, body paragraphs, and conclusion.

Use names, phrases, and events found in the draft so the advice cannot be mistaken for generic feedback.

For a new webpage, copy [assets/frontend-template](assets/frontend-template) into the target and adapt it. Keep the three-file, no-build static structure unless the user asks for a framework.

## Feedback Standard

Correct errors that are defensible from the supplied text. Distinguish grammar accuracy from expression quality, style, and content. If semantic intent is genuinely ambiguous, say so instead of inventing a correction.

For IELTS, do not call a score out of 15 or award a fixed percentage for vocabulary. For CET-4/6/考研, do not convert the result to an IELTS band unless the user explicitly asks for a clearly labeled comparison.

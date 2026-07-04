#!/usr/bin/env bash
# =============================================================================
# 03-session-end-summary.sh — Session Close Guard
# =============================================================================
# Type:    Stop hook (runs when Claude tries to end the session)
# Purpose: Ensures wake-up.md is up to date before Claude stops, verifies a
#          journal entry was written, and shows a session activity summary.
#
# Configure in .claude/settings.json:
# {
#   "hooks": {
#     "Stop": [
#       {
#         "hooks": [{"type": "command", "command": "bash .claude/hooks/03-session-end-summary.sh"}]
#       }
#     ]
#   }
# }
#
# Exit codes:
#   0 = OK to stop
#   2 = Block stop — wake-up.md or journal not updated
# =============================================================================

# Don't use set -euo pipefail here — we want graceful fallbacks throughout
# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BLUE='\033[0;34m'
BOLD='\033[1m'
DIM='\033[2m'
RESET='\033[0m'

TODAY="$(date +%Y-%m-%d)"
NOW="$(date '+%Y-%m-%d %H:%M:%S')"
PROJECT_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
ISSUES=()

echo -e "\n${BLUE}${BOLD}🏁 SESSION CLOSE CHECK${RESET}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo -e "${DIM}  Timestamp: ${NOW}${RESET}"
echo -e "${DIM}  Project:   ${PROJECT_ROOT}${RESET}"
echo ""

# =============================================================================
# CHECK 1: wake-up.md exists and was modified today
# =============================================================================
WAKEUP_FILE="${PROJECT_ROOT}/memory/wake-up.md"
echo -e "${CYAN}${BOLD}[1/4] Checking wake-up.md...${RESET}"

if [[ ! -f "$WAKEUP_FILE" ]]; then
  echo -e "  ${RED}✗ wake-up.md does not exist${RESET}"
  ISSUES+=("wake-up.md is missing — create it with current session context")
else
  # Check if modified today (cross-platform: try stat with Linux then macOS syntax)
  if stat --version &>/dev/null 2>&1; then
    # GNU stat (Linux/WSL)
    FILE_DATE="$(stat -c '%y' "$WAKEUP_FILE" 2>/dev/null | cut -d' ' -f1 || echo "unknown")"
  else
    # BSD stat (macOS)
    FILE_DATE="$(stat -f '%Sm' -t '%Y-%m-%d' "$WAKEUP_FILE" 2>/dev/null || echo "unknown")"
  fi

  if [[ "$FILE_DATE" == "$TODAY" ]]; then
    echo -e "  ${GREEN}✓ wake-up.md updated today (${FILE_DATE})${RESET}"
    # Show last few lines as preview
    echo -e "  ${DIM}Preview:${RESET}"
    tail -5 "$WAKEUP_FILE" 2>/dev/null | while IFS= read -r LINE; do
      echo -e "    ${DIM}${LINE}${RESET}"
    done
  else
    echo -e "  ${YELLOW}⚠ wake-up.md last modified: ${FILE_DATE} (not today)${RESET}"
    ISSUES+=("Update wake-up.md with today's session context and next steps")
  fi
fi

echo ""

# =============================================================================
# CHECK 2: Journal entry for today
# =============================================================================
JOURNAL_DIR="${PROJECT_ROOT}/memory/journal"
JOURNAL_FILE="${JOURNAL_DIR}/${TODAY}.md"
echo -e "${CYAN}${BOLD}[2/4] Checking journal entry...${RESET}"

if [[ ! -d "$JOURNAL_DIR" ]]; then
  echo -e "  ${YELLOW}⚠ journal/ directory does not exist${RESET}"
  ISSUES+=("Create journal/${TODAY}.md with a summary of what was done today")
elif [[ ! -f "$JOURNAL_FILE" ]]; then
  echo -e "  ${YELLOW}⚠ No journal entry for today (${TODAY})${RESET}"
  echo -e "  ${DIM}Expected: ${JOURNAL_FILE}${RESET}"
  ISSUES+=("Write journal/${TODAY}.md — summarize decisions, progress, and next steps")
else
  WORD_COUNT="$(wc -w < "$JOURNAL_FILE" 2>/dev/null || echo 0)"
  if [[ "$WORD_COUNT" -lt 20 ]]; then
    echo -e "  ${YELLOW}⚠ Journal entry exists but looks too short (${WORD_COUNT} words)${RESET}"
    ISSUES+=("Expand journal/${TODAY}.md — only ${WORD_COUNT} words written")
  else
    echo -e "  ${GREEN}✓ Journal entry found: ${JOURNAL_FILE} (${WORD_COUNT} words)${RESET}"
  fi
fi

echo ""

# =============================================================================
# CHECK 3: SYNC.MD exists and was modified today
# =============================================================================
SYNC_FILE="${PROJECT_ROOT}/memory/SYNC.MD"
echo -e "${CYAN}${BOLD}[3/4] Checking SYNC.MD...${RESET}"

if [[ ! -f "$SYNC_FILE" ]]; then
  echo -e "  ${RED}✗ SYNC.MD does not exist${RESET}"
  ISSUES+=("memory/SYNC.MD is missing — create it with current branch, commits, and changed files")
else
  if stat --version &>/dev/null 2>&1; then
    SYNC_DATE="$(stat -c '%y' "$SYNC_FILE" 2>/dev/null | cut -d' ' -f1 || echo "unknown")"
  else
    SYNC_DATE="$(stat -f '%Sm' -t '%Y-%m-%d' "$SYNC_FILE" 2>/dev/null || echo "unknown")"
  fi

  if [[ "$SYNC_DATE" == "$TODAY" ]]; then
    echo -e "  ${GREEN}✓ SYNC.MD updated today (${SYNC_DATE})${RESET}"
    tail -3 "$SYNC_FILE" 2>/dev/null | while IFS= read -r LINE; do
      echo -e "    ${DIM}${LINE}${RESET}"
    done
  else
    echo -e "  ${YELLOW}⚠ SYNC.MD last modified: ${SYNC_DATE} (not today)${RESET}"
    ISSUES+=("Update memory/SYNC.MD with current branch, new commits, and files changed this session")
  fi
fi

echo ""

# =============================================================================
# CHECK 4: Git activity summary for this session
# =============================================================================
echo -e "${CYAN}${BOLD}[4/4] Session git activity summary...${RESET}"

if git -C "$PROJECT_ROOT" rev-parse HEAD &>/dev/null 2>&1; then
  # Files changed (unstaged + staged)
  CHANGED="$(git -C "$PROJECT_ROOT" diff --stat HEAD 2>/dev/null || true)"
  STAGED="$(git -C "$PROJECT_ROOT" diff --cached --stat 2>/dev/null || true)"
  UNTRACKED_COUNT="$(git -C "$PROJECT_ROOT" ls-files --others --exclude-standard 2>/dev/null | wc -l | tr -d ' ')"

  if [[ -n "$CHANGED" ]]; then
    echo -e "  ${BOLD}Modified files (vs HEAD):${RESET}"
    echo "$CHANGED" | head -20 | while IFS= read -r LINE; do
      echo -e "    ${DIM}${LINE}${RESET}"
    done
  fi

  if [[ -n "$STAGED" ]]; then
    echo -e "  ${BOLD}Staged files:${RESET}"
    echo "$STAGED" | head -10 | while IFS= read -r LINE; do
      echo -e "    ${GREEN}${LINE}${RESET}"
    done
  fi

  if [[ "$UNTRACKED_COUNT" -gt 0 ]]; then
    echo -e "  ${YELLOW}New untracked files: ${UNTRACKED_COUNT}${RESET}"
  fi

  if [[ -z "$CHANGED" && -z "$STAGED" && "$UNTRACKED_COUNT" -eq 0 ]]; then
    echo -e "  ${DIM}No git changes detected in this session${RESET}"
  fi
else
  echo -e "  ${DIM}(Not a git repository or git not available)${RESET}"
fi

echo ""

# =============================================================================
# DECISION: Block or allow stop
# =============================================================================
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"

if [[ ${#ISSUES[@]} -gt 0 ]]; then
  echo -e "\n${RED}${BOLD}🚫 STOP BLOCKED — Complete these tasks first:${RESET}\n"
  for i in "${!ISSUES[@]}"; do
    echo -e "  ${RED}$((i+1)).${RESET} ${ISSUES[$i]}"
  done
  echo -e "\n${YELLOW}These ensure you can resume this session effectively tomorrow.${RESET}\n"
  exit 2
else
  echo -e "${GREEN}${BOLD}✅ All session checks passed — OK to stop${RESET}"
  echo ""
  exit 0
fi

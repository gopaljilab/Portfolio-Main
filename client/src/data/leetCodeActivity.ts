export const LEETCODE = {
  profile: "https://leetcode.com/u/gopaljilab/",
  snapshotLabel: "28 November 2026",
  // Public profile's submitStatsGlobal.acSubmissionNum.
  difficulties: [
    { label: "Easy", solved: 175, color: "bg-primary/80" },
    { label: "Medium", solved: 27, color: "bg-primary" },
    { label: "Hard", solved: 2, color: "bg-foreground" },
  ],
};

export const LEETCODE_SOLVED = LEETCODE.difficulties.reduce((total, difficulty) => total + difficulty.solved, 0);

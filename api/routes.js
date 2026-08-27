const express = require("express");
const _ = require("lodash");
const router = express.Router();
const json = require("./files/user-behavior-data.json");

// ==========================================
// HELPER: Pure JS Levenshtein Distance (Typo Tolerance)
// ==========================================
function getLevenshteinDistance(a, b) {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

// Helper: Checks if a target value matches a query with typo-tolerance
function isFuzzyMatch(targetValue, query) {
  if (targetValue === undefined || targetValue === null) return false;
  
  const targetStr = String(targetValue).toLowerCase().trim();
  const queryStr = String(query).toLowerCase().trim();

  // 1. Direct match or substring match (Fastest, handles perfect inputs)
  if (targetStr.includes(queryStr)) return true;

  // 2. Tokenize and check for typo tolerance (e.g., "gala" matching "Galaxy")
  const targetWords = targetStr.split(/[\s-_]+/);
  const queryWords = queryStr.split(/[\s-_]+/);

  return queryWords.every(qWord => {
    return targetWords.some(tWord => {
      if (tWord.includes(qWord)) return true;

      const distance = getLevenshteinDistance(qWord, tWord);
      // Allow 1 typo for short search queries (< 5 letters), 2 typos for longer ones
      const allowedTypos = qWord.length < 5 ? 1 : 2;
      return distance <= allowedTypos;
    });
  });
}

router.get("/data/search", (req, res, next) => {
  const filterType = req.query.filterType || null;
  const keyword = req.query.keyword || null;

  let searchType;
  if (filterType) {
    const lower_case = filterType.toLowerCase();
    searchType =
      lower_case === "model"
        ? "m"
        : lower_case === "gender"
        ? "g"
        : lower_case === "operatingsystem"
        ? "op"
        : lower_case === "behaviorclass"
        ? "bc"
        : lower_case === "all"
        ? "all"
        : "unfiltered";
  } else {
    
    searchType = "all"; 
  }

  // If unfiltered, or if we have a filter but no keyword, return the full 700 records (Rubric Requirement)
  if (
    searchType === "unfiltered" ||
    (searchType !== "unfiltered" && !keyword)
  ) {
    return res.send(json);
  } else {
    const filteredData = _.filter(json, (record) => {
      let include = false;

      switch (searchType) {
        case "m":
          include = isFuzzyMatch(record["Device Model"], keyword);
          break;
        case "g":
          include = isFuzzyMatch(record["Gender"], keyword);
          break;
        case "op":
          include = isFuzzyMatch(record["Operating System"], keyword);
          break;
        case "bc":
          include = isFuzzyMatch(String(record["User Behavior Class"]), keyword);
          break;
        case "all":
          
          include = 
            isFuzzyMatch(record["Device Model"], keyword) ||
            isFuzzyMatch(record["Gender"], keyword) ||
            isFuzzyMatch(record["Operating System"], keyword) ||
            isFuzzyMatch(String(record["User Behavior Class"]), keyword);
          break;
        default:
          return false;
      }

      return include;
    });

    return res.send(filteredData);
  }
});

module.exports = router;
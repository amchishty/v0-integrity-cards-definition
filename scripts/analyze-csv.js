const response = await fetch(
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Copy%20of%20Orion%20Example%20Set%201%20-%20trace_annotation_1%20%281%29-EgTXu4msTeEn1pMVmIXBXygXuhJOOT.csv",
)
const csvText = await response.text()

// Parse CSV
const lines = csvText.split("\n")
const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""))

console.log("=== CSV STRUCTURE ===\n")
console.log("Total rows (including header):", lines.length)
console.log("\nColumn headers:")
headers.forEach((header, i) => {
  console.log(`  ${i + 1}. "${header}"`)
})

console.log("\n=== FIRST DATA ROW (Row 2) ===\n")
if (lines[1]) {
  // Simple CSV parsing (note: this won't handle commas within quoted fields perfectly)
  const firstRow = lines[1].split(",")
  headers.forEach((header, i) => {
    const value = firstRow[i] ? firstRow[i].trim().replace(/^"|"$/g, "") : ""
    const preview = value.length > 100 ? value.substring(0, 100) + "..." : value
    console.log(`${header || "(unnamed)"}:`)
    console.log(`  ${preview}\n`)
  })
}

console.log("\n=== SAMPLE OF ALL ROWS ===\n")
// Show first 5 data rows
for (let i = 1; i <= Math.min(5, lines.length - 1); i++) {
  console.log(`Row ${i + 1}:`)
  const cells = lines[i].split(",")
  console.log(`  Unnamed column: ${cells[0]?.substring(0, 50)}`)
  console.log(`  Total Time Spent (thought): ${cells[4]?.substring(0, 80)}...`)
  console.log(`  Action column: ${cells[5]?.substring(0, 80)}...`)
  console.log("")
}

console.log("\n=== KEY OBSERVATIONS ===")
console.log("- Each row represents one step in the agent trajectory")
console.log('- The task description appears to be in the "Name:" column')
console.log('- Agent thoughts are in "Total Time Spent:" column')
console.log('- Agent actions are in the "1hr6" column')
console.log("- Annotation columns include Q2 and Q3 with TRUE/FALSE values")
console.log("- Comment columns provide explanations for the annotations")

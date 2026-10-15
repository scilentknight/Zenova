import { prisma } from "../lib/prisma";
import { parseDateOnly } from "../lib/jewellery/rate-calculator";
async function debugRates() {
  const today = parseDateOnly();
  console.log("Today (UTC):", today.toISOString());
  const materials = await prisma.material.findMany({
    where: { isActive: true },
    include: { purities: { where: { isActive: true } } },
    orderBy: { name: "asc" },
  });
  console.log(
    "\n--- /api/admin/material-rates response (materialRateSummaries) ---",
  );
  for (const mat of materials) {
    console.log(`Material: ${mat.name} (${mat.id})`);
    for (const p of mat.purities) {
      console.log(`  Purity: ${p.name} (${p.id})`);
    }
  }
  const mockRateJson = {
    data: materials.map((mat) => ({
      materialId: mat.id,
      materialName: mat.name,
      materialCode: mat.code,
      unit: mat.unit,
      type: mat.type,
      purities: mat.purities,
      baseRateRecord: null,
      derivedRates: [],
    })),
  };
  console.log(
    "\n--- MaterialComposition ratesMap build (simulating the bug) ---",
  );
  const brokenMap = {};
  const rateList = mockRateJson.data ?? [];
  for (const r of rateList) {
    const key = `${r.materialId}:${r.purityId}`;
    brokenMap[key] = Number(r.rate);
    console.log("  Key from broken loop:", key, "->", r.rate);
  }
  console.log("\nBroken map:", brokenMap);
  console.log("\n--- What the correct map should look like ---");
  const correctMap = {};
  for (const r of rateList) {
    console.log(
      "  Material:",
      r.materialId,
      "derivedRates count:",
      r.derivedRates?.length ?? 0,
    );
  }
  const { getAllDerivedPurityRatesForMaterial } =
    await import("../lib/jewellery/rate-calculator");
  console.log("\n--- Actual derived rates from DB ---");
  for (const mat of materials) {
    const derived = await getAllDerivedPurityRatesForMaterial(mat.id, today);
    console.log(
      `Material: ${mat.name}, baseRateRecord:`,
      derived.baseRateRecord
        ? `${Number(derived.baseRateRecord.rate)} NPR`
        : "NULL",
    );
    for (const dr of derived.derivedRates) {
      const key = `${mat.id}:${dr.purityId}`;
      correctMap[key] = dr.rate;
      console.log(
        `  Derived: ${dr.purityName} -> NPR ${dr.rate}  [key: ${key}]`,
      );
    }
  }
  console.log("\nCorrect map:", correctMap);
}
debugRates()
  .catch(console.error)
  .finally(() => import("../lib/prisma").then((m) => m.prisma.$disconnect()));

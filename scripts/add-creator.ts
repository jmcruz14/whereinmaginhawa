#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';

/**
 * Add Creator to All Places Script
 *
 * Adds createdBy field to all existing place files
 * Usage: tsx scripts/add-creator.ts
 */

const CREATOR_NAME = 'Joff Tiquez';

function addCreatorToPlaces() {
  const rootDir = process.cwd();
  const placesDir = path.join(rootDir, 'apps/web/src/data/places');

  console.info('📝 Adding creator to all place files...\n');
  console.info(`  Creator: ${CREATOR_NAME}`);
  console.info(`  Directory: ${placesDir}\n`);

  // Read all JSON files
  const files = fs.readdirSync(placesDir)
    .filter(file => file.endsWith('.json'));

  console.info(`📄 Found ${files.length} place files\n`);

  let updatedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  files.forEach(file => {
    const filePath = path.join(placesDir, file);

    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const place = JSON.parse(content);

      // Check if createdBy already exists
      if (place.createdBy) {
        console.info(`  ⏭️  ${file} - already has creator`);
        skippedCount++;
        return;
      }

      // Add createdBy field
      place.createdBy = CREATOR_NAME;

      // Write back to file
      const output = JSON.stringify(place, null, 2);
      fs.writeFileSync(filePath, output + '\n', 'utf-8');

      console.info(`  ✅ ${file}`);
      updatedCount++;
    } catch (error) {
      errorCount++;
      console.error(`  ❌ ${file}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

  console.info('');
  console.info('✨ Migration complete!\n');
  console.info('📊 Statistics:');
  console.info(`  ✅ Updated: ${updatedCount}`);
  console.info(`  ⏭️  Skipped: ${skippedCount}`);
  console.info(`  ❌ Errors: ${errorCount}`);
  console.info(`  📝 Total: ${files.length}`);
}

// Run if executed directly
if (require.main === module) {
  addCreatorToPlaces();
}

import { db } from '#app/utils/db.server';
import { legacyBaseUrl } from './base.server';

export async function syncRulesets() {
  const resourceUrl = `${legacyBaseUrl}/rules`;

  const response = await fetch(resourceUrl);
  const data = await response.json();

  for (const ruleset of data) {
    await db.ruleset.upsert({
      where: { slug: ruleset.id },
      create: {
        name: ruleset.name,
        slug: ruleset.id,
        description: ruleset.description,
        extraQuestionRuleId: ruleset.extraQuestionRuleId,
        matchRuleId: ruleset.matchRuleId,
        roundRuleId: ruleset.roundRuleId,
        tipRuleId: ruleset.tipRuleId,
      },
      update: {},
    });
  }
}

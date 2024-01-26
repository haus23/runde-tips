import { invariant } from '@epic-web/invariant';
import { m } from 'framer-motion';
import { db } from '#app/utils/db.server';
import { legacyBaseUrl } from './base.server';

export async function syncChampionships() {
  const response = await fetch(`${legacyBaseUrl}/championships`);
  const fbChampionships = await response.json();

  const championships = await db.championship.findMany();
  const rulesets = await db.ruleset.findMany();

  for (const fbCampionship of fbChampionships) {
    const championship = championships.find((c) => c.slug === fbCampionship.id);

    // Check for already synced completed championships
    if (championship?.completed && fbCampionship.completed) {
      console.log(
        `Skip already synced completed championship ${fbCampionship.id}`,
      );
      continue;
    }

    console.log(`Syncing championship ${fbCampionship.id}`);

    const rulesetId = rulesets.find(
      (r) => r.slug === fbCampionship.rulesId,
    )?.id;
    if (!rulesetId) {
      throw new Error('Unknown ruleset');
    }

    // Check sync mode
    let syncMode: string;
    if (!championship && fbCampionship.completed) {
      syncMode = 'simple-insert';
    } else if (!championship) {
      syncMode = 'prepare-sync';
    } else if (!fbCampionship.completed) {
      syncMode = 'sync';
    } else {
      syncMode = 'final-sync';
    }

    switch (syncMode) {
      case 'simple-insert':
        await simpleInsert(fbCampionship, rulesetId);
        break;

      default:
        break;
    }
  }
}

// biome-ignore lint/suspicious/noExplicitAny: won't type the firebase objects
async function simpleInsert(fbCampionship: any, rulesetId: number) {
  const teams = await db.team.findMany();
  const leagues = await db.league.findMany();
  const users = await db.user.findMany();

  // Get Matches and Players and Tips
  const { fbMatches, fbPlayers, fbTips } = await loadStandings(
    fbCampionship.id,
  );

  const championship = await db.championship.create({
    data: {
      slug: fbCampionship.id,
      name: fbCampionship.name,
      nr: fbCampionship.nr,
      published: fbCampionship.published,
      completed: fbCampionship.completed,
      extraPointsPublished: fbCampionship.extraPointsPublished,
      rulesetId,
    },
  });

  // Extract rounds
  for (const r of fbMatches.rounds) {
    const round = await db.round.create({
      data: {
        nr: r.nr,
        isDoubleRound: r.isDoubleRound,
        championshipId: championship.id,
        published: true,
        completed: true,
        tipsPublished: true,
      },
    });
    r.roundId = round.id;
  }

  // Extract matches
  for (const m of fbMatches.matches) {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const round = fbMatches.rounds.find((r: any) => r.id === m.roundId);
    const league = leagues.find((l) => l.slug === m.leagueId);
    const hometeam = teams.find((t) => t.slug === m.hometeamId);
    const awayteam = teams.find((t) => t.slug === m.awayteamId);

    const optionalProps = {
      date: m.date || undefined,
      leagueId: league?.id,
      hometeamId: hometeam?.id,
      awayteamId: awayteam?.id,
    };

    const match = await db.match.create({
      data: {
        nr: m.nr,
        result: m.result,
        points: m.points,
        championshipId: championship.id,
        roundId: round.roundId,
        ...optionalProps,
      },
    });
    m.matchId = match.id;
  }

  // Extract players
  for (const p of fbPlayers) {
    const user = users.find((u) => u.slug === p.playerId);
    invariant(user, 'Unknown user');

    const player = await db.player.create({
      data: {
        points: p.points,
        extraPoints: p.extraPoints,
        totalPoints: p.totalPoints,
        rank: p.rank,
        userId: user.id,
        championshipId: championship.id,
      },
    });
    p.playerId = player.id;
  }

  // Extract tips
  for (const p of fbPlayers) {
    const fbPlayerTips = fbTips.get(p.id);
    for (const matchId of Object.keys(fbPlayerTips.tips)) {
      const fbTip = fbPlayerTips.tips[matchId];

      if (!fbTip.tip) {
        return;
      }

      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      const match = fbMatches.matches.find((m: any) => m.id === matchId);
      invariant(match, 'Unknown match');

      await db.tip.create({
        data: {
          championshipId: championship.id,
          playerId: p.playerId,
          matchId: match.matchId,
          tip: fbTip.tip,
          joker: fbTip.joker || undefined,
          extraJoker: fbTip.extraJoker || undefined,
          lonelyHit: fbTip.lonelyHit || undefined,
          points: fbTip.points,
        },
      });
    }
  }
}

async function loadStandings(fbCampionshipId: string) {
  let response = await fetch(
    `${legacyBaseUrl}/championships/${fbCampionshipId}/matches`,
  );
  const fbMatches = await response.json();

  response = await fetch(
    `${legacyBaseUrl}/championships/${fbCampionshipId}/players`,
  );
  const fbPlayers = await response.json();

  const fbTips = new Map();
  for (const p of fbPlayers) {
    response = await fetch(
      `${legacyBaseUrl}/championships/${fbCampionshipId}/player-tips?name=${p.playerId}`,
    );
    const tips = await response.json();
    fbTips.set(p.id, tips);
  }

  return { fbMatches, fbPlayers, fbTips };
}

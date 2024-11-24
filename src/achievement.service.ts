import { Injectable } from '@stlmpp/di';
import { ach, Drizzle, usr } from '@st-achievements/database';
import { and, asc, eq, InferSelectModel, isNull, sql } from 'drizzle-orm';
import { AchievementDto } from './achievement.dto.js';

@Injectable()
export class AchievementService {
  constructor(private readonly drizzle: Drizzle) {}

  #baseQuery(userId: number, periodId: number) {
    return this.drizzle
      .select({
        achievementId: ach.achievement.id,
        achievementName: ach.achievement.name,
        achievementDescription: ach.achievement.description,
        achievementImageUrl: ach.achievement.imageUrl,
        achievementLevelId: ach.achievement.levelId,
        achievementLevelName: ach.level.name,
        achievementLevelImgUrl: ach.level.imageUrl,
        achievementHasProgressTracking: ach.achievement.hasProgressTracking,
        progress: {
          quantity: usr.achievementProgress.quantity,
          required: ach.achievement.quantityNeeded,
        },
        achievedAt: usr.achievement.achievedAt,
      })
      .from(ach.achievement)
      .innerJoin(ach.level, eq(ach.level.id, ach.achievement.levelId))
      .leftJoin(
        usr.achievement,
        and(
          eq(ach.achievement.id, usr.achievement.achAchievementId),
          eq(usr.achievement.userId, userId),
          eq(usr.achievement.periodId, periodId),
        ),
      )
      .leftJoin(
        usr.achievementProgress,
        and(
          eq(ach.achievement.id, usr.achievementProgress.achAchievementId),
          eq(usr.achievementProgress.userId, userId),
          eq(usr.achievementProgress.periodId, periodId),
        ),
      );
  }

  async findOne(userId: number, periodId: number, achievementId: number) {
    const [achievement] = await this.#baseQuery(userId, periodId)
      .where(
        and(
          isNull(ach.achievement.inactivatedAt),
          eq(ach.achievement.id, achievementId),
        ),
      )
      .execute();
    return achievement;
  }

  findMany(userId: number, periodId: number) {
    return this.#baseQuery(userId, periodId)
      .where(and(isNull(ach.achievement.inactivatedAt)))
      .orderBy(
        sql`${usr.achievement.achAchievementId} asc nulls last`,
        asc(ach.achievement.id),
      )
      .execute();
  }
}

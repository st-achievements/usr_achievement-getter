import { Controller, Handler, ZParams, ZRes } from '@st-api/core';
import {
  GetAchievementsDto,
  GetAchievementsResponseDto,
} from './get-achievements.dto.js';
import { AssertAuthUser } from '@st-achievements/core';
import { AchievementService } from '../achievement.service.js';

@ZRes(GetAchievementsResponseDto)
@AssertAuthUser()
@Controller({
  path: 'v1/users/:userId/period/:periodId/achievements',
  method: 'GET',
})
export class GetAchievementsController implements Handler {
  constructor(private readonly achievementService: AchievementService) {}

  async handle(
    @ZParams(GetAchievementsDto) { periodId, userId }: GetAchievementsDto,
  ): Promise<GetAchievementsResponseDto> {
    const achievements = await this.achievementService.findMany(
      userId,
      periodId,
    );
    return {
      achievements: achievements.map((achievement) => ({
        ...achievement,
        achievedAt: achievement.achievedAt ?? undefined,
        achievementDescription: achievement.achievementDescription ?? undefined,
        achievementImageUrl: achievement.achievementImageUrl ?? undefined,
        achievementLevelImgUrl: achievement.achievementLevelImgUrl ?? undefined,
        progress: achievement.achievementHasProgressTracking
          ? {
              quantity: achievement.progress.quantity ?? 0,
              required: achievement.progress.required,
            }
          : undefined,
        userId,
        periodId,
      })),
    };
  }
}

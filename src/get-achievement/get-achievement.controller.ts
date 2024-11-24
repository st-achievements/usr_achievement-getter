import { Controller, Handler, ZParams, ZRes } from '@st-api/core';
import {
  GetAchievementParamDto,
  GetAchievementResponseDto,
} from './get-achievement.dto.js';
import { AssertAuthUser } from '@st-achievements/core';
import { ACHIEVEMENT_NOT_FOUND } from '../exceptions.js';
import { AchievementService } from '../achievement.service.js';

@ZRes(GetAchievementResponseDto)
@AssertAuthUser()
@Controller({
  path: 'v1/users/:userId/period/:periodId/achievements/:achievementId',
  method: 'GET',
})
export class GetAchievementController implements Handler {
  constructor(private readonly achievementService: AchievementService) {}

  async handle(
    @ZParams(GetAchievementParamDto)
    { achievementId, userId, periodId }: GetAchievementParamDto,
  ): Promise<GetAchievementResponseDto> {
    const achievement = await this.achievementService.findOne(
      userId,
      periodId,
      achievementId,
    );
    if (!achievement) {
      throw ACHIEVEMENT_NOT_FOUND();
    }
    return {
      achievement: {
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
      },
    };
  }
}

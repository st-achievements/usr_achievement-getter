import { z } from 'zod';
import { ParamIntSchema } from '@st-api/core';
import { AchievementDto } from '../achievement.dto.js';

export const GetAchievementParamDto = z.object({
  achievementId: ParamIntSchema,
  userId: ParamIntSchema,
  periodId: ParamIntSchema,
});

export type GetAchievementParamDto = z.output<typeof GetAchievementParamDto>;

export const GetAchievementResponseDto = z.object({
  achievement: AchievementDto,
});

export type GetAchievementResponseDto = z.input<
  typeof GetAchievementResponseDto
>;

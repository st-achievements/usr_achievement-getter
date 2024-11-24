import { z } from 'zod';
import { ParamIntSchema } from '@st-api/core';
import { AchievementDto } from '../achievement.dto.js';

export const GetAchievementsDto = z.object({
  userId: ParamIntSchema,
  periodId: ParamIntSchema,
});

export type GetAchievementsDto = z.output<typeof GetAchievementsDto>;

export const GetAchievementsResponseDto = z.object({
  achievements: AchievementDto.array(),
});

export type GetAchievementsResponseDto = z.input<
  typeof GetAchievementsResponseDto
>;

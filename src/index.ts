import 'reflect-metadata';
import { AchievementsCoreAdapter } from '@st-achievements/core';
import { StFirebaseApp } from '@st-api/firebase';
import { GetAchievementController } from './get-achievement/get-achievement.controller.js';
import { GetAchievementsController } from './get-achievements/get-achievements.controller.js';
import { AchievementService } from './achievement.service.js';

const app = StFirebaseApp.create({
  adapter: new AchievementsCoreAdapter({
    throttling: true,
    authentication: 'JWT',
  }),
  controllers: [GetAchievementController, GetAchievementsController],
  providers: [AchievementService],
}).withHttpHandler();

export const usr_achievement = {
  getter: {
    http: app.getHttpHandler(),
  },
};

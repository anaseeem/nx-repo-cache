/**
 * @author        Dr. J. Quader
 * @copyright     © 2021-2024 by J. Quader
 */
import { Module } from '@nestjs/common'

import { DatabaseModule } from '@jaqua/db'

import { ScheduleResolvers } from './schedule.resolvers'
import { ScheduleService } from './schedule.service'

@Module({
  imports: [DatabaseModule],
  providers: [ScheduleService, ScheduleResolvers]
})
export class ScheduleModule {}

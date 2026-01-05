/**
 * @fileoverview  GraphQL resolvers for cirs module
 * @copyright © 2021-2025 by J. Quader
 * @author Dr. J. Quader
 */
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import {
  AddSuggestedDateInput,
  CirsDataset,
  GetSuggestedDatesParam,
  SaveDateInput,
  SuggestedDates
} from '@jaqua/cirs/graphql'
import { GqlAuthGuard, RolesGuard, Roles } from '@jaqua/auth/backend'

import { ScheduleService } from './schedule.service'

@Resolver('Schedule')
export class ScheduleResolvers {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Query(() => [Date])
  async getSchedulesPeriods(): Promise<Array<Date>> {
    return this.scheduleService.getSchedulesPeriods()
  }

  @Query(() => [CirsDataset])
  @Roles('user')
  @UseGuards(GqlAuthGuard, RolesGuard)
  async getSuggestedDates(
    @Args('param') param: GetSuggestedDatesParam
  ): Promise<SuggestedDates> {
    return this.scheduleService.getSuggestedDates(param)
  }

  @Mutation(() => String)
  @Roles('user')
  @UseGuards(GqlAuthGuard, RolesGuard)
  async createCurrentSchedule(): Promise<string> {
    return this.scheduleService.createCurrentSchedule()
  }

  @Mutation(() => Boolean)
  @Roles('user')
  @UseGuards(GqlAuthGuard, RolesGuard)
  async addSuggestedDate(
    @Args('input') input: AddSuggestedDateInput
  ): Promise<boolean> {
    return this.scheduleService.addSuggestedDate(input)
  }

  @Mutation(() => Boolean)
  @Roles('admin')
  @UseGuards(GqlAuthGuard, RolesGuard)
  async saveDate(@Args('input') input: SaveDateInput): Promise<boolean> {
    return this.scheduleService.saveDate(input)
  }
}

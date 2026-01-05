/**
 * @fileoverview  GraphQL resolvers for cirs module
 * @author        Dr. J. Quader
 * @copyright     © 2021-2024 by J. Quader
 */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import {
  AddCirsDatasetInput,
  BarChart,
  CirsDataset,
  GetBarChartDataParam,
  UpdateCirsDatasetInput
} from '@jaqua/cirs/graphql'

import { CirsService } from './cirs.service'

@Resolver('Cirs')
export class CirsResolvers {
  constructor(private readonly cirsService: CirsService) {}

  @Query(() => [CirsDataset])
  async getCirsDatasets(
    @Args('period') period: string
  ): Promise<Array<CirsDataset>> {
    return this.cirsService.getCirsDatasets(period)
  }

  @Query(() => Number)
  async countPendingCirsDatasets(): Promise<number> {
    return this.cirsService.countPendingCirsDatasets()
  }

  @Query(() => BarChart)
  async getBarChartData(
    @Args('param') param: GetBarChartDataParam
  ): Promise<BarChart> {
    return this.cirsService.getBarChartData(param)
  }

  @Mutation(() => String)
  async addCirsDataset(
    @Args('input') input: AddCirsDatasetInput
  ): Promise<string> {
    return this.cirsService.addCirsDataset(input)
  }

  @Mutation(() => Object)
  async updateCirsDataset(
    @Args('input') input: UpdateCirsDatasetInput
  ): Promise<string> {
    return this.cirsService.updateCirsDataset(input)
  }

  @Mutation(() => Date)
  async finishCirsDataset(@Args('id') id: string): Promise<Date> {
    return this.cirsService.finishCirsDataset(id)
  }
}

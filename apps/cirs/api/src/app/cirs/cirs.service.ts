/**
 * @author        Dr. J. Quader
 * @copyright     © 2021-2024 by J. Quader
 *
 * @requires      NPM:@nestjs/common
 * @requires      NPM:check-types
 * @requires      NPM:mongodb
 * @requires      NPM:nanoid
 *
 * @requires      @jaqua/cirs/graphql
 * @requires      @jaqua/shared/util/formatting
 */
import { Inject, Injectable } from '@nestjs/common'
import { assert } from 'check-types'
import { Db, MongoServerError } from 'mongodb'
import { nanoid } from 'nanoid'

import {
  AddCirsDatasetInput,
  BarChart,
  CirsDataset,
  GetBarChartDataParam,
  UpdateCirsDatasetInput
} from '@jaqua/cirs/graphql'
import { capitalizeFirstLetter } from '@jaqua/shared/util/formatting'

@Injectable()
export class CirsService {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private db: Db
  ) {}

  /**
   * Get cirs datasets
   * @param {string} [period]
   * @return {CirsDataset[]}
   */
  async getCirsDatasets(period: string): Promise<Array<CirsDataset>> {
    const Cirs = this.db.collection<CirsDataset>('data')

    const query = period
      ? { period: new Date(parseInt(period, 10)) }
      : { isFinished: { $exists: false } }

    try {
      const result = await Cirs.find(query, { sort: { date: -1 } }).toArray()
      return result
    } catch (error) {
      if (error instanceof MongoServerError) {
        console.error(error)
      }
      throw error
    }
  }

  /**
   * Count pending cirs datasets
   * @return {number}
   */
  async countPendingCirsDatasets(): Promise<number> {
    const Cirs = this.db.collection<CirsDataset>('data')
    const query = { isFinished: { $exists: false } }

    try {
      return Cirs.countDocuments(query)
    } catch (error) {
      if (error instanceof MongoServerError) {
        console.error(error)
      }
      throw error
    }
  }

  /**
   * Get values for hour statistics
   * @param {string} type
   * @returns {BarChart}
   */
  async getBarChartData({ type }: GetBarChartDataParam): Promise<BarChart> {
    const Cirs = this.db.collection<CirsDataset>('data')

    let target
    let labels: string[] = []
    let data: number[] = []

    switch (type) {
      case 'hour':
        target = { $hour: '$date' }
        labels = new Array(24)
        data = new Array(24)
        for (let i = 0; i < 24; ++i) {
          labels[i] = String(i)
          data[i] = 0
        }
        break
      case 'type':
        target = '$type'
        break
      case 'group':
        target = '$group'
        break
      case 'location':
        target = '$location'
        break
    }

    try {
      const result = await Cirs.aggregate([
        {
          $group: {
            _id: target,
            count: { $sum: 1 }
          }
        },
        {
          $sort: { _id: 1 }
        }
      ]).toArray()

      if (type === 'hour') {
        result.map((d) => {
          data[d['_id']] = d['count']
        })
      } else {
        labels = result.map((d) => capitalizeFirstLetter(d['_id']))
        data = result.map((d) => d['count'])
      }

      return {
        labels,
        data
      }
    } catch (error) {
      if (error instanceof MongoServerError) {
        console.error(error)
      }
      throw error
    }
  }

  /**
   * Add new cirs dataset
   * @return ID of new cirs dataset
   */
  async addCirsDataset(input: AddCirsDatasetInput): Promise<string> {
    assert.string(input.group)
    assert.string(input.location)
    assert.string(input.type)
    assert.maybe.string(input.description)
    assert.maybe.string(input.instruction)
    assert.maybe.string(input.injury)
    assert.maybe.string(input.control)
    assert.maybe.string(input.solution)
    assert.maybe.string(input.speed)
    assert.maybe.string(input.hardware)
    assert.maybe.string(input.label)
    assert.maybe.string(input.who)
    assert.maybe.string(input.suggestion)

    const Cirs = this.db.collection<CirsDataset>('data')
    const count = await Cirs.countDocuments()

    const data = {
      _id: nanoid(10),
      dataId: count + 1,
      reported: new Date(),
      ...input
    }
    data.date = new Date(input.date)

    try {
      const { insertedId } = await Cirs.insertOne(data)
      return insertedId
    } catch (error) {
      if (error instanceof MongoServerError) {
        console.error(error)
      }
      throw error
    }
  }

  /**
   * Update dataset
   * @return {Result}
   */
  async updateCirsDataset(input: UpdateCirsDatasetInput): Promise<string> {
    const Cirs = this.db.collection<CirsDataset>('data')

    const { id, ...rest } = input

    try {
      await Cirs.updateOne({ _id: id }, { $set: rest })
      return id
    } catch (error) {
      if (error instanceof MongoServerError) {
        console.error(error)
      }
      throw error
    }
  }

  /**
   * Finish dataset
   * @return {Date} isFinished Datetime
   */
  async finishCirsDataset(id: string): Promise<Date> {
    const Cirs = this.db.collection<CirsDataset>('data')
    const isFinished = new Date()

    try {
      await Cirs.updateOne({ _id: id }, { $set: { isFinished } })
      return isFinished
    } catch (error) {
      if (error instanceof MongoServerError) {
        console.error(error)
      }
      throw error
    }
  }
}

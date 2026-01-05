/**
 * @author        Dr. J. Quader
 * @copyright     © 2021-2024 by J. Quader
 */
import { Inject, Injectable } from '@nestjs/common'
import { Db, MongoServerError } from 'mongodb'

import {
  AddSuggestedDateInput,
  GetSuggestedDatesParam,
  SaveDateInput,
  SuggestedDates
} from '@jaqua/cirs/graphql'

@Injectable()
export class ScheduleService {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private db: Db
  ) {}

  /**
   * Get schedule periods
   * @return {Date[]}
   */
  async getSchedulesPeriods(): Promise<Array<Date>> {
    const Schedule = this.db.collection<SuggestedDates>('schedule')

    try {
      const periods = await Schedule.aggregate([
        { $group: { _id: '$period' } }
      ]).toArray()
      return periods.map((d) => d['_id'])
    } catch (error) {
      if (error instanceof MongoServerError) {
        console.error(error)
      }
      throw error
    }
  }

  /**
   * Get suggested date for specific period
   * @param param {GetSuggestedDatesParam}
   * @return {SuggestedDates}
   */
  async getSuggestedDates({
    period
  }: GetSuggestedDatesParam): Promise<SuggestedDates> {
    const Schedule = this.db.collection<SuggestedDates>('schedule')

    try {
      const last = await Schedule.findOne({}, { sort: { period: -1 } })
      const isNewCollectionPeriod = last?.presentation
        ? new Date(last?.presentation) < new Date()
        : false
      const query = period
        ? { period: new Date(period) }
        : !isNewCollectionPeriod
          ? {}
          : { period: new Date() }

      const result = await Schedule.findOne(query, { sort: { period: -1 } })
      if (!result) throw Error('No suggested dates')

      return result
    } catch (error) {
      if (error instanceof MongoServerError) {
        console.error(error)
      }
      throw error
    }
  }

  /**
   * Create nuw current schedule dataset and set period value
   * in each cirs dataset
   * @return {string}
   */
  async createCurrentSchedule(): Promise<string> {
    const Cirs = this.db.collection('data')
    const Schedule = this.db.collection('schedule')

    const date = new Date()

    try {
      const affected =
        (await Cirs.find({ period: { $exists: false } }).toArray()) || []
      if (!affected?.length) throw Error('No affected datasets')
      const affectedIds = affected.map((d) => d._id)

      await Cirs.updateMany(
        { _id: { $in: affectedIds } },
        { $set: { period: date } }
      )

      const result = await Schedule.insertOne({
        period: date,
        count: affected.length,
        aufnahme: [],
        k10: [],
        k11: [],
        k12: [],
        briefing: null,
        presentation: null
      })
      return result?.insertedId?.toString()
    } catch (error) {
      if (error instanceof MongoServerError) {
        console.error(error)
      }
      throw error
    }
  }

  /**
   * Add date suggestion to dataset
   * @param input {AddSuggestedDateInput}
   * @return {boolean}
   */
  async addSuggestedDate({
    period,
    ward,
    date
  }: AddSuggestedDateInput): Promise<boolean> {
    const Schedule = this.db.collection('schedule')

    try {
      const result = await Schedule.updateOne(
        { period: new Date(period) },
        { $addToSet: { [ward]: date } },
        { upsert: true }
      )
      return result.modifiedCount > 0
    } catch (error) {
      if (error instanceof MongoServerError) {
        console.error(error)
      }
      throw error
    }
  }

  /**
   * Add final date to dataset
   * @param input {SaveDateInput}
   * @return {boolean}
   */
  async saveDate({ period, type, date }: SaveDateInput): Promise<boolean> {
    const Schedule = this.db.collection('schedule')

    try {
      const result = await Schedule.updateOne(
        { period: new Date(period) },
        { $set: { [type]: new Date(date) } }
      )
      return result.modifiedCount > 0
    } catch (error) {
      if (error instanceof MongoServerError) {
        console.error(error)
      }
      throw error
    }
  }
}

/**
 * @author        Dr. J. Quader
 * @copyright     © 2021-2024 by J. Quader
 */
import { Module } from '@nestjs/common'

import { DatabaseModule } from '@jaqua/db'

import { CirsResolvers } from './cirs.resolvers'
import { CirsService } from './cirs.service'

@Module({
  imports: [DatabaseModule],
  providers: [CirsService, CirsResolvers]
})
export class CirsModule {}

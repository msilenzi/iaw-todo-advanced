import { plainToInstance } from 'class-transformer'
import { IsInt, IsOptional, IsString, validateSync } from 'class-validator'
import { config as dotenvConfig } from 'dotenv'

dotenvConfig({ path: '.env' })

class EnvironmentVariables {
  @IsInt()
  @IsOptional()
  readonly PORT?: number

  @IsString()
  readonly MONGODB_URI: string

  @IsString()
  readonly JWT_SECRET_KEY: string
}

function validateConfig(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  })
  const errors = validateSync(validatedConfig, {})

  if (errors.length > 0) {
    throw new Error(errors.toString())
  }
  return validatedConfig
}

export default validateConfig(process.env)

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { HeaderApiKeyStrategy } from './authHeaderApiKey.strategy';

@Module({
  imports: [PassportModule],
  providers: [HeaderApiKeyStrategy],
})
export class AuthModule {}
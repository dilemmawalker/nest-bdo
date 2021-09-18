import { DocumentBuilder } from "@nestjs/swagger";

const config = new DocumentBuilder()
.setTitle('Onboarding Api')
.setDescription('The api hub for onboarding applications')
.setVersion('1.0')
.build();

export default config;
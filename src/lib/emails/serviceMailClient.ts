import { resolve } from 'path'
import handlebars from 'handlebars';
import fs from 'fs';
import { users, genders } from '@prisma/client';

import userViews from '../../views/users';
import { months } from '../../views/dateFormatar';


interface User extends users {
  genders: genders | null
}

interface msgProps {
  user: User
  service: string
  date: string
}

const emailPath = resolve(__dirname, "..", "..", "views", "emails", "serviceMailClient.hbs");
const templateFileContent = fs.readFileSync(emailPath).toString('utf-8');

const mailTemplateParseClient = handlebars.compile(templateFileContent);

const dateNow = new Date();

const today = `${months[dateNow.getMonth()]} ${dateNow.getFullYear()}`;
const baseUrl = process.env.URL;

const CreateMessage = (msgProps: msgProps) => {
  const {user, service, date} = msgProps;

  const userInfo = userViews.render(user, null);
  
  const html = mailTemplateParseClient({
    ...userInfo,
    service,
    date,
    today,
    baseUrl
  })


  const msg = {
    to: `${userInfo.email}`,
    from: 'Ogolfim <arlindo.boa@ogolfim.com>',
    subject: `${service}`,
    text: `
      Olá ${userInfo.name}! 

      ${date} é a data marcada para nossa conversa.  
      Estamos ansiosos para juntos iniciar uma nova era nos seus negócios.

      Os teu objetivos são os nossos objetivo, por isso, desde já estamos a sua disposição
      pode sempre nos contactar pelo número +258 852192413 ou email ogolfim@protonmail.com.

      Está é nossa matéria de discussão:
        As tuas metas com o software;
        A sua disponibilidade na construção dos sistemas;
        Material/informação disponível para ser usado;
        Tempo limite para a conclusão do projecto;
        Formas de pagamento;
    `,
    html: html
  }
  
  return msg;
}

export default CreateMessage;

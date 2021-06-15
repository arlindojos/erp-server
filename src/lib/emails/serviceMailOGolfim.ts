import { resolve } from 'path'
import handlebars from 'handlebars';
import fs from 'fs';
import { companies, users, genders } from '@prisma/client';

import userViews, { Address } from '../../views/users';
import companyViews from '../../views/company';
import dateFormatar, { months } from '../../views/dateFormatar';

interface User extends users {
  genders: genders | null
}

interface msgProps {
  user: User
  company: companies
  isClient: boolean
  userAddress: Address
  companyAddress: Address
  service: string
  date: string
}

const emailPath = resolve(__dirname, "..", "..", "views", "emails", "serviceMailOGolfim.hbs");
const templateFileContent = fs.readFileSync(emailPath).toString('utf-8');

const mailTemplateParseClient = handlebars.compile(templateFileContent);


const CreateMessage = (msgProps: msgProps) => {
  const {user, company, isClient,  userAddress, companyAddress, service, date} = msgProps;

  const dateNow = new Date();

  const today = `${months[dateNow.getMonth()]} ${dateNow.getFullYear()}`;
  const baseUrl = process.env.URL;

  const clientDate = dateFormatar(company.created_at);
  const clientSince = isClient ? `Cliente desde ${clientDate}` : 'Primeira vez usando nosso sistema';

  const companyInfo = companyViews.render(company, companyAddress);
  const userInfo = userViews.render(user, userAddress);
  
  const html = mailTemplateParseClient({
    ...userInfo,
    ...companyInfo, 
    clientSince, 
    service,
    date,
    today,
    baseUrl
  })

  const msg = {
    to: 'hello.ogolfim@gmail.com',
    from: 'Ogolfim <sales.ogolfim@gmail.com>',
    subject: `Client, ${service}`,
    text: `
      Nova solicitação de serviços ${service}. Pela empresa ${company.name}
      ,nome do client ${user.name}, ${user.tel}, email ${user.email}.
      Conversa agendada para: ${date}
    `,
    html: html
  }
  
  return msg;
}

export default CreateMessage;

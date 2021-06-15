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
  message: string
  userAddress: Address
  companyAddress: Address
}

const emailPath = resolve(__dirname, "..", "..", "views", "emails", "helpMail.hbs");
const templateFileContent = fs.readFileSync(emailPath).toString('utf-8');

const mailTemplateParseClient = handlebars.compile(templateFileContent);

const CreateMessage = ({user, company, isClient, message, userAddress, companyAddress}: msgProps) => {

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
    message,
    today,
    baseUrl
  })


  const msg = {
    to: 'hello.ogolfim@gmail.com',
    from: 'Ogolfim <sales.ogolfim@gmail.com>',
    subject: `Moldando o futuro da tecnologia`,
    text: `
      Novo email vindo do website Ogolfim. Nome do client ${user.name}
      , email ${user.email}, ${user.tel}, empresa ${company.name}.
      Message: ${message}
    `, 
    html: html
  }
  
  return msg;
}

export default CreateMessage;

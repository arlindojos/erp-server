import { resolve } from 'path'
import handlebars from 'handlebars';
import fs from 'fs';
import { months } from '../../views/dateFormatar';


interface TeamMember {
  name: string
  email: string
  role: string
}


const emailPath = resolve(__dirname, "..", "..", "views", "emails", "VCteamMemberMail.hbs");
const templateFileContent = fs.readFileSync(emailPath).toString('utf-8');

const mailTemplateParseClient = handlebars.compile(templateFileContent);


const CreateMessage = (msgProps: TeamMember) => {
  const {name, role, email} = msgProps;
  const baseUrl = process.env.URL;
  
  const dateNow = new Date();
  const today = `${months[dateNow.getMonth()]} ${dateNow.getFullYear()}`;

  const html = mailTemplateParseClient({name, role, baseUrl, today})

  const msg = {
    to: `${email}`,
    from: 'Ogolfim <arlindo.boa@ogolfim.com>',
    subject: `Sua candidatura para a posição, ${role}`,
    text: `
      Olá ${name}! 
      A sua candidatura para ${role} foi recebida com sucesso.
      Obrigado pelo seu interesse em fazer parte da nossa equipa.

      Voltamos a entrar em contacto, logo que terminarmos o analise da sua candidatura.
    `,
    html: html
  }
  
  return msg;
}

export default CreateMessage;

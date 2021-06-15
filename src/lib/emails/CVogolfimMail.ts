import { resolve } from 'path'
import handlebars from 'handlebars';
import fs from 'fs';
import { ogolfim_team } from '@prisma/client';
import createUrl from '../../views/pdfUrl';

interface TeamMember extends ogolfim_team {
  name: string
  email: string
  role: string
}

const emailPath = resolve(__dirname, "..", "..", "views", "emails", "VCOgolfim.hbs");
const templateFileContent = fs.readFileSync(emailPath).toString('utf-8');

const mailTemplateParseClient = handlebars.compile(templateFileContent);


const CreateMessage = (msgProps: TeamMember) => {
  const {name, role, cv_path, experience, portfolio, years_of_experience } = msgProps;
  
  const html = mailTemplateParseClient({ 
    name, 
    role, 
    experience,
    portfolio,
    cvPath: createUrl(cv_path),
    yoe: years_of_experience
  })

  const msg = {
    to: 'ogolfim@protonmail.com',
    from: 'Ogolfim <sales.ogolfim@gmail.com>',
    subject: `Nova candidatura para ${role}`,
    text: `
      Candidatura de ${name}, 
      para a vaga de ${role}.
      O ${name} tem ${years_of_experience} de experiência na area.
      Seu portfolio: ${portfolio}.
      CV: ${createUrl(cv_path)}. 

      Trabalhos: ${experience}
    `,
    html: html
  }
  
  return msg;
}

export default CreateMessage;

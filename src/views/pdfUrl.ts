
const createUrl = (path: string) => {
  return `${process.env.URL}/uploads/pdfs/${path}`
}

export default createUrl;
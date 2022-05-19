import * as contentful from 'contentful-management'

export default (context: any, inject: any) => {
  const config = {
    accessToken: context.env.ctfCmaAccessToken,
  }

  const ctfCmaClient: any = contentful.createClient(config)
  inject('ctfCmaClient', ctfCmaClient)
}
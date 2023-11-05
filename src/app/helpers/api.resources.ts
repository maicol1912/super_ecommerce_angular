import { environment } from 'src/environments/environment';

/*
Resource Used to request backend
 */
export const ApiResources = {
  login: `users/login`,
  checkJwt: `users/checkJwt`,
  session: `usuario${environment.perfixEndpoints}/session`,
  downloadClient: `resources${environment.perfixEndpoints}/downloadClient`,
  registerUser: `usuario${environment.perfixEndpoints}/new`,
  userListByUser: (user: string) =>
    `usuario${environment.perfixEndpoints}/list/by-document/${user}`,
  resetPassword: (id: string) =>
    `usuario${environment.perfixEndpoints}/reset-password/${id}`,
  myUserList: `usuario${environment.perfixEndpoints}/my-list`,
  clients: {
    create: () => 'crm-service/client',
    getAllClients: () => 'crm-service/client',
    update: (id: string) => `crm-service/client/${id}`
  }
};

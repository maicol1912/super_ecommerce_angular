import { environment } from 'src/environments/environment';

/*
Resource Used to request backend
 */
export const ApiResources = {
  login: `users/login`,
  signup: `users`,
  checkJwt: `users/checkJwt`,
  sendOtpCode: (email:string) =>
    `users/send-opt-email/${email}`,
  verifyEmail: (otp: string,email:string) =>
    `users/verify-email/${otp}/${email}`,
  forgotPassword: (email:string) =>
    `users/forgot-password/${email}`,
  changePassword: (email:string) =>
    `users/change-password/${email}`,
  sentChangePassword: (email:string) =>
    `users/send-change-password/${email}`,

  clients: {
    create: () => 'crm-service/client',
    getAllClients: () => 'crm-service/client',
    update: (id: string) => `crm-service/client/${id}`
  }
};

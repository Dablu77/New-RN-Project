// export const ServerUrl = 'http://localhost:1700/api/v1/'; // Local Server URL
export const ServerUrl = 'https://server.houszzz.com/api/v1/'; // Staging Server URL

// Consumer Api's
export const LoginApiUrl = ServerUrl + 'user/login';

export const CreateCompanyApiUrl = ServerUrl + 'user/createCompany';

export const GetProfileApiUrl = ServerUrl + 'user/getProfile';

export const ResendOtpApiUrl = ServerUrl + 'user/resendOTP';

export const ChangePasswordApiUrl = ServerUrl + 'user/changePassword';

export const GetProjectListApiUrl = ServerUrl + 'project/getProjectsList';

export const CreateProjectApiUrl = ServerUrl + 'project/createproject';

export const NotificationListApiUrl = ServerUrl + 'user/notificationList';

export const GetNewProjectListApiUrl = ServerUrl + 'project/getNewProjectsList';

export const GetIncompleteProjectListApiUrl =
  ServerUrl + 'project/getIncompleteProjectsList';

export const GetCompleteProjectListApiUrl =
  ServerUrl + 'project/getCompleteProjectsList';

export const ProjectPackageListApiUrl = ServerUrl + 'project/packagelist';

export const StaticListApiUrl = ServerUrl + 'static/getstaticList';

// Payment
export const AddToCartUrl = ServerUrl + 'paypal/addTocart';

export const GetCartListUrl = ServerUrl + 'paypal/getCart';

export const PaypalPaymentGatewayUrl = ServerUrl + 'paypal/pay';

export const UpdateProfileUrl = ServerUrl + 'user/editProfile';
export const ListReportsUrl = ServerUrl + 'user/listReport';

export const ProjectWithPaginationUrl =
  ServerUrl + 'project/getProjectsListwithPagination';
export const CompleteProjectWithPaginationUrl =
  ServerUrl + 'project/getCompleteProjectsListwithPagination';
export const InCompleteProjectWithPaginationUrl =
  ServerUrl + 'project/getIncompleteProjectsListwithPagination';
export const NewProjectWithPaginationUrl =
  ServerUrl + 'project/getNewProjectsListwithPagination';

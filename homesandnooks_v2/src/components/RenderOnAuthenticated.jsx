import userService from "../services/userService";

const RenderOnAuthenticated = ({ children, url }) => 
    (userService.isLoggedIn()) ? children : userService.doLogin({redirectUri: url});
;

export default RenderOnAuthenticated;


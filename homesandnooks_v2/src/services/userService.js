import Keycloak from "keycloak-js";


const _kc = new Keycloak('/keycloak.json');


// @param onAuthenticatedCallback


const initKeyCloak = (onAuthenticatedCallback) => {
    _kc.init({
        onLoad: "check-sso",
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
        pkceMethod: "S256",
    })
    .then((authenticated) => {
        if (!authenticated) {
            console.log('user is not authenticated');
        }
        onAuthenticatedCallback();
    })
    .catch(console.error);
    
}

const doLogin = _kc.login;

const doRegister = _kc.register;

const userAccount = _kc.accountManagement;



const doLogout = _kc.logout;

const getToken = () => _kc.token;

const isLoggedIn = () => !!_kc.token;

// const updateToken = (successCallback) => 
//     _kc.updateToken(5)
//         .then(successCallback)
//         .catch(doLogin);

const updateToken = _kc.updateToken;

const getUser = () => _kc.tokenParsed?.preferred_username;

const getUserName = () => _kc.tokenParsed?.given_name;

const hasRole = (roles) => roles.some((role) => 
    _kc.hasRealmRole(role));


const userService = {
    initKeyCloak,
    doLogin,
    doLogout,
    isLoggedIn,
    getToken,
    updateToken,
    getUser,
    getUserName,
    hasRole,
    doRegister,
    userAccount
}

export default userService;
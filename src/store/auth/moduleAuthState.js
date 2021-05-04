export default {
    isAuthenticated: false,
    error: false,
    token: localStorage.getItem('insta-token') || null,
    user: localStorage.getItem('insta-profile') || null,
    permissions: localStorage.getItem('user-permissions') || null,
    process: false,
    permissionsLoaded: false
}

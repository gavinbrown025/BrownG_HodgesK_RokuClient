import TheLoginPage from './components/TheLoginComponent.js';
import TheAllUsersPage from './components/TheAllUsersPage.js';
import TheHomePage from './components/TheHomeComponent.js';
import TheDetailsPage from './components/TheDetailsComponent.js';
import TheMusicPage from './components/TheMusicPage.js';


const router = new VueRouter({
    routes: [
        {path: '/', name: 'root', component: TheLoginPage, beforeEnter: (to, from, next) => {
            if(localStorage.getItem('cacheduser')){
                let user = JSON.parse(localStorage.getItem('cacheduser'));
                next({name: 'home', params: {currentuser: user}});
            } else {
                next();
            }
        }},

        {path: '/users', name: 'users', component: TheAllUsersPage},
        {path: '/home', name: 'home', component: TheHomePage, props: true},
        {path: '/details', name: 'details', component: TheDetailsPage, props: true},
        {path: '/music', name: 'music', component: TheMusicPage},
    ]
});

(() => {

    new Vue({
        data: {
            authenticated: false,
            currentUser: undefined,
            isAdmin: false,
        },
        methods: {
            authenticateUser(user) {
                this.currentUser = user;
                this.authenticated = true;
                if(user.user_admin > 0){
                    this.isAdmin = true;
                }
            },

            logout(){
                if(localStorage.getItem('cacheduser')){
                    localStorage.removeItem('cacheduser');
                }
                this.$router.push({ name: "root"});
                this.currentUser = undefined;
            }
        },
        router
    }).$mount("#app");

})();
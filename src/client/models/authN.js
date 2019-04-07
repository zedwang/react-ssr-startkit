export default {
    state: {
        loading: false,
        data: {}
    },
    reducer: {
        login: (state, payload) => {
            return {
                data: {
                    name: "Haven",
                    nickname: "口水鱼"
                }
            };
        },
        signOut: (state) => {
            return {
                loading: false,
                data: {}
            };
        }
    },
    effects: {
        // async login(payload, rootState) {
        //     const response = await fetch('http://xxxx.com');
        //     const data = response.json();
        //     this.login(data);
        // },
        // async signOut() {
        //     const response = await fetch('http://xxx.com/signOut').json();
        //     this.signOut(response);
        // }
    }
};
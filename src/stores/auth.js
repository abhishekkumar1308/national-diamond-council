import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        dealer: {
            userId: null,
            name: '',
            mobile: '',
            language: '',
            isAuthenticated: false,
        },
        selfie: {
            userId: null,
            name: '',
            mobile: '',
            language: '',
            tvc_video: '',
            isAuthenticated: false,
        },
        contractor: {
            userId: null,
            name: '',
            mobile: '',
            language: '',
            isAuthenticated: false,
        },
        userType:''
    }),

    actions: {
        // Automatically load session data when the store initializes
        initSession() {
            this.userType = localStorage.getItem('user_type');
            const dealerSession = localStorage.getItem('dealer_session');
            const contractorSession = localStorage.getItem('contractor_session');
            const selfieSession = localStorage.getItem('selfie_session');

            if (dealerSession) {
                this.dealer = JSON.parse(dealerSession);
            }
            if (selfieSession) {
                this.selfie = JSON.parse(selfieSession);
            }
            if (contractorSession) {
                this.contractor = JSON.parse(contractorSession);
            }
        },

        // Dealer login action
        loginDealer({ userId, name, mobile,isAuthenticated= false }) {
            this.dealer = { userId, name, mobile, isAuthenticated };
            this.saveSession('dealer', this.dealer);
        },
        loginSelfie({ userId, name, mobile,isAuthenticated= false ,tvc_video=''}) {
            this.selfie = { userId, name, mobile,tvc_video, isAuthenticated };
            this.saveSession('selfie', this.selfie);
        },

        // Contractor login action
        loginContractor({ userId, name, mobile, isAuthenticated= false }) {
            this.contractor = { userId, name, mobile, isAuthenticated };
            this.saveSession('contractor', this.contractor);
        },

        // Save session to localStorage
        saveSession(userType, data) {
            localStorage.setItem(`${userType}_session`, JSON.stringify(data));
        },

        // Clear session and local storage for dealer or contractor
        clearSession(userType) {
            if (userType === 'dealer') {
                this.dealer = { userId: null, name: '', mobile: '', isAuthenticated: false, language: '', tvc_video: ''};
            } else if (userType === 'contractor') {
                this.contractor = { userId: null, name: '', mobile: '', isAuthenticated: false,language: '',tvc_video: ''};
            }
            localStorage.removeItem(`${userType}_session`);
        },

        // Dealer logout action
        logoutDealer() {
            this.clearSession('dealer');
        },

        // Contractor logout action
        logoutContractor() {
            this.clearSession('contractor');
        },
    },

    getters: {
        isDealerAuthenticated: (state) => state.dealer.isAuthenticated,
        isSelfieAuthenticated: (state) => state.selfie.isAuthenticated,
        isContractorAuthenticated: (state) => state.contractor.isAuthenticated,
        user_type: (state) => state.userType,
    },
});

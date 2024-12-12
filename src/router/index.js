import { createRouter, createWebHistory/*,createWebHashHistory*/ } from 'vue-router';
import { authGuard } from '@/middleware/authMiddleware';
import DealerLanding from '@/views/dealer/DealerLanding.vue';
import DealerOnboarding from '@/views/dealer/DealerOnboarding.vue';
import DealerLogin from '@/views/dealer/DealerLogin.vue';
import DealerOtpVerify from '@/views/dealer/DealerOtpVerify.vue';
import DealerPortfolio from "@/views/dealer/DealerPortfolio.vue";
import DealerCaptureSelfie from "@/views/dealer/DealerCaptureSelfie.vue";
// import DealerCaptureVideo from "@/views/dealer/DealerCaptureVideo.vue";
import DealerDashboard from '@/views/dealer/DealerDashboard.vue';

// Contractor
import ContractorLanding from '@/views/contractor/ContractorLanding.vue';
import ContractorOnboarding from '@/views/contractor/ContractorOnboarding.vue';
import ContractorLogin from '@/views/contractor/ContractorLogin.vue';
import ContractorOtpVerify from '@/views/contractor/ContractorOtpVerify.vue';
import ContractorPortfolio from "@/views/contractor/ContractorPortfolio.vue";
import ContractorCaptureSelfie from "@/views/contractor/ContractorCaptureSelfie.vue";
import ContractorDashboard from '@/views/contractor/ContractorDashboard.vue';

// Selfie video
import SelfieLanding from '@/views/selfievideo/SelfieLanding.vue';
import SelfieOnboarding from '@/views/selfievideo/SelfieOnboarding.vue';
import SelfieLogin from '@/views/selfievideo/SelfieLogin.vue';
import SelfieOtpVerify from '@/views/selfievideo/SelfieOtpVerify.vue';
import SelfiePortfolio from "@/views/selfievideo/SelfiePortfolio.vue";
import SelfieCaptureVideo from "@/views/selfievideo/SelfieCaptureVideo.vue";
import SelfieDashboard from '@/views/selfievideo/SelfieDashboard.vue';
import SelfieVedioSelection from '@/views/selfievideo/SelfieVideoSelection.vue';

const routes = [
    {
        path: '/',
        redirect: '/dealer',  // Default redirect to Dealer
        children: [

        ]
    },
    {
        path: '/dealer',
        children: [
            {
                path: '',  // Empty string as default child route under /dealer
                component: DealerLanding,
                meta: { requiresAuth: false, userType: 'dealer' }
            },
            {
                path:"login",
                component: DealerLogin,
                meta: { requiresAuth: false, userType: 'dealer' }
            },
            {
                path:"otp-verify",
                name: 'dealer-otp-verify',
                component: DealerOtpVerify,
                props: route => ({
                    name: route.params.name,
                    mobile: route.params.mobile,
                    redirect: route.params.redirect
                }),
                meta: { requiresAuth: false, userType: 'dealer' }
            },
            {
                path:"take-selfie",
                name:"take-selfie",
                component: DealerCaptureSelfie,
                meta: { requiresAuth: true, userType: 'dealer' }
            },
            /*{
                path:"video",
                name:"record-video",
                component: DealerCaptureVideo,
                meta: { requiresAuth: true, userType: 'dealer' }
            },*/
            {
                path:"portfolio",
                name:"portfolio",
                component: DealerPortfolio,
                meta: { requiresAuth: true, userType: 'dealer' }
            },
            {
              path:'onboarding',
              component: DealerOnboarding,
              meta: { requiresAuth: false, userType: 'dealer' }
            },
            {
                path: 'dashboard',
                component: DealerDashboard,
                meta: { requiresAuth: true, userType: 'dealer' }
            },
            // Add more dealer screens as needed
        ],
    },
    {
        path: '/contractor',  // Default redirect to Dealer
        children: [

        ]
    },
    {
        path: '/contractor',
        children: [
            {
                path: '',  // Empty string as default child route under /dealer
                component: ContractorLanding,
                meta: { requiresAuth: false, userType: 'contractor' }
            },
            {
                path:"login",
                component: ContractorLogin,
                meta: { requiresAuth: false, userType: 'contractor' }
            },
            {
                path:"otp-verify",
                name: 'contractor-otp-verify',
                component: ContractorOtpVerify,
                props: route => ({
                    name: route.params.name,
                    mobile: route.params.mobile,
                    redirect: route.params.redirect
                }),
                meta: { requiresAuth: false, userType: 'contractor' }
            },
            {
                path:"take-selfie",
                component: ContractorCaptureSelfie,
                meta: { requiresAuth: true, userType: 'contractor' }
            },
            {
                path:"portfolio",
                name:"portfolio",
                component: ContractorPortfolio,
                meta: { requiresAuth: true, userType: 'contractor' }
            },
            {
              path:'onboarding',
              component: ContractorOnboarding,
              meta: { requiresAuth: false, userType: 'contractor' }
            },
            {
                path: 'dashboard',
                component: ContractorDashboard,
                meta: { requiresAuth: true, userType: 'contractor' }
            },
            // Add more contractor screens as needed
        ],
    },
    {
        path: '/selfie',
        children: [

        ]
    },
    {
        path: '/selfie',
        children: [
            {
                path: '',  // Empty string as default child route under /selfie-video
                component:  SelfieLanding,
                meta: { requiresAuth: false, userType: 'selfie-video' }
            },
            {
                path: 'video-type',  // Empty string as default child route under /selfie-video
                component:  SelfieVedioSelection,
                meta: { requiresAuth: false, userType: 'selfie-video' }
            },
            {
                path:"login",
                component:  SelfieLogin,
                meta: { requiresAuth: false, userType: 'selfie-video' }
            },
            {
                path:"otp-verify",
                name: 'otp-verify',
                component:  SelfieOtpVerify,
                props: route => ({
                    name: route.params.name,
                    mobile: route.params.mobile,
                    redirect: route.params.redirect
                }),
                meta: { requiresAuth: false, userType: 'selfie-video' }
            },
            {
                path:"video",
                name:"record-video",
                component:  SelfieCaptureVideo,
                meta: { requiresAuth: true, userType: 'selfie-video' }
            },
            {
                path:"portfolio",
                name:"portfolio",
                component:  SelfiePortfolio,
                meta: { requiresAuth: true, userType: 'selfie-video' }
            },
            {
                path:'onboarding',
                component:  SelfieOnboarding,
                meta: { requiresAuth: false, userType: 'selfie-video' }
            },
            {
                path: 'dashboard',
                component:  SelfieDashboard,
                meta: { requiresAuth: true, userType: 'selfie-video' }
            },
            // Add more selfie-video screens as needed
        ],
    },
];

const router = createRouter({
    history: createWebHistory('/birla'),
    routes,
});
// Use the auth middleware for global route guarding
router.beforeEach(authGuard);

export default router;

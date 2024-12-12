import { useAuthStore } from '@/stores/auth';

export function authGuard(to, from, next) {
    const userType = to.meta.userType;
    const authStore = useAuthStore();
    localStorage.setItem('user_type',userType);
    const userTypes = {"selfie-video":"selfie","dealer":"dealer","contractor":"contractor"}
    const prefix_url = userTypes[userType];
    // Check if the route requires authentication
    if (to.meta.requiresAuth) {
        // Validate authentication based on userType (dealer or contractor)
        if ((prefix_url === 'dealer' && authStore.isDealerAuthenticated) ||
            (prefix_url === 'contractor' && authStore.isContractorAuthenticated) ||
            (prefix_url === 'selfie' && authStore.isSelfieAuthenticated)) {
            next(); // User is authenticated, allow access
        } else {
            // Redirect to appropriate login page if not authenticated
            next({ path: `/${prefix_url}` });
        }
    } else {
        if ((prefix_url === 'selfie' && authStore.isSelfieAuthenticated)) {
            next({ path: `/selfie/video` });
        }else if ((prefix_url === 'dealer' && authStore.isDealerAuthenticated) ||
            (prefix_url === 'contractor' && authStore.isContractorAuthenticated)) {
            next({ path: `/${prefix_url}/take-selfie` });
        }
        next(); // Route does not require authentication, allow access
    }
}

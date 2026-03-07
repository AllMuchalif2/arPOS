import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";
import { useSuperadminStore } from "../stores/superadminStore";
import { useSuperAdminTokoManagement } from "../composables/useSuperAdminTokoManagement";
import { useSuperAdminAdminManagement } from "../composables/useSuperAdminAdminManagement";
import { usePwaInstall } from "../composables/usePwaInstall";

export function useSuperAdminPresenter() {
  const auth = useAuthStore();
  const router = useRouter();
  const adminStore = useSuperadminStore();
  const toko = useSuperAdminTokoManagement();
  const admin = useSuperAdminAdminManagement();
  const { isInstallable, installApp } = usePwaInstall();

  const activeTab = ref<"dashboard" | "toko" | "admin" | "pendaftar">(
    "dashboard",
  );

  const logout = async () => {
    await auth.logout();
    router.push({ name: "Login" });
  };

  onMounted(async () => {
    try {
      await Promise.all([
        adminStore.fetchToko(),
        adminStore.fetchAdminAccounts(),
      ]);
    } catch (error) {
      // silent
    }
  });

  return {
    adminStore,
    toko,
    admin,
    isInstallable,
    installApp,
    activeTab,
    logout,
  };
}

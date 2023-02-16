<script setup>
import { ref } from "vue";
import { computed } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import { StorageService } from "@/services/storage.service";
import { useAuthStore } from "@/stores/auth.store";

const isPopup = ref(false);
const isSidebar = ref(true);
const route = useRoute();
const me = StorageService.getUser();
const router = useRouter();
const authStore = useAuthStore();

const activeClass = (url, mobile) => {
  if (!mobile) {
    if (route.path === url) {
      return "border-blue-500 border-b-2 text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium";
    } else {
      return "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium";
    }
  } else {
    if (route.path === url) {
      return "bg-blue-50 border-blue-500 text-blue-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium";
    } else {
      return "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium";
    }
  }
};

const logout = () => {
  authStore.logout();
  router.replace("/");
};
</script>
<template>
  <div class="min-h-full">
    <nav class="border-b border-gray-200 bg-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 justify-between">
          <div class="flex">
            <div class="flex flex-shrink-0 items-center">
              <img
                class="block h-8 w-auto lg:hidden"
                src="/favicon.png"
                alt="Your Company"
              />
              <img
                class="hidden h-8 w-auto lg:block"
                src="/favicon.png"
                alt="Your Company"
              />
            </div>
            <div
              class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-4 md:space-x-8"
            >
              <!-- Current: "border-blue-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->

              <router-link to="/admin" :class="activeClass('/admin')">
                Dashboard
              </router-link>
              <router-link
                to="/admin/positions"
                :class="activeClass('/admin/positions')"
              >
                Positions
              </router-link>
              <router-link
                to="/admin/employees"
                :class="activeClass('/admin/employees')"
              >
                Employees
              </router-link>
              <router-link
                to="/admin/salaries"
                :class="activeClass('/admin/salaries')"
              >
                Salaries
              </router-link>
            </div>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:items-center">
            <p class="px-2 sm:text-sm font-medium">Halo, {{ me.name }}</p>

            <!-- Profile dropdown -->
            <div class="relative ml-3">
              <div>
                <button
                  @click="isPopup = !isPopup"
                  type="button"
                  class="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  v-click-outside="() => (isPopup = false)"
                >
                  <span class="sr-only">Open user menu</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-10 h-10 text-gray-400"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <!--
              Dropdown menu, show/hide based on menu state.

              Entering: "transition ease-out duration-200"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            -->
              <div
                v-if="isPopup"
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabindex="-1"
              >
                <button
                  @click="logout"
                  class="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                  id="user-menu-item-2"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
          <div class="-mr-2 flex items-center sm:hidden">
            <!-- Mobile menu button -->
            <button
              @click="isSidebar = !isSidebar"
              type="button"
              class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <!--
              Heroicon name: outline/bars-3

              Menu open: "hidden", Menu closed: "block"
            -->
              <svg
                class="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <!--
              Heroicon name: outline/x-mark

              Menu open: "block", Menu closed: "hidden"
            -->
              <svg
                class="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu, show/hide based on menu state. -->
      <div v-if="isSidebar" class="sm:hidden" id="mobile-menu">
        <div class="space-y-1 pt-2 pb-3">
          <!-- Current: "bg-blue-50 border-blue-500 text-blue-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" -->
          <router-link to="/admin" :class="activeClass('/admin', true)">
            Dashboard
          </router-link>
          <router-link
            to="/admin/positions"
            :class="activeClass('/admin/positions', true)"
          >
            Positions
          </router-link>
          <router-link
            to="/admin/employees"
            :class="activeClass('/admin/employees', true)"
          >
            Employees
          </router-link>
          <router-link
            to="/admin/salaries"
            :class="activeClass('/admin/salaries', true)"
          >
            Salaries
          </router-link>
        </div>
        <div class="border-t border-gray-200 pt-4 pb-3">
          <div class="flex items-center px-4">
            <div class="flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-8 h-8 text-gray-400"
              >
                <path
                  fill-rule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p class="px-4 sm:text-sm font-medium">Halo, {{ me.name }}</p>
            </div>
          </div>
          <div class="mt-3 space-y-1">
            <button
              @click="logout"
              class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div class="py-10">
      <main>
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <!-- Replace with your content -->
          <div class="px-4 py-8 sm:px-0">
            <router-view />
          </div>
          <!-- /End replace -->
        </div>
      </main>
    </div>
  </div>
</template>
